package achievement

import (
	"github.com/alarmfox/game-repository/api"
	"github.com/alarmfox/game-repository/model"
	"gorm.io/gorm"

	"strconv"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (gs *Repository) Create(r *CreateRequest) (Achievement, error) {
    var (
        achievement = model.Achievement{
            Name:               r.Name,
            Category:           r.Category,
            ProgressRequired:   r.ProgressRequired,
        }
    )

    err := gs.db.Transaction(func(tx *gorm.DB) error {
        return tx.Create(&achievement).Error
    })

	if err != nil {
		return Achievement{}, api.MakeServiceError(err)
	}

    return fromModel(&achievement), nil
}

func (gs *Repository) FindById(id int64) (Achievement, error) {
	var achievement model.Achievement

	err := gs.db.
		First(&achievement, id).
		Error

	return fromModel(&achievement), api.MakeServiceError(err)
}

func (gs *Repository) FindAll() ([]Achievement, error) {
    var achievements []model.Achievement

    err := gs.db.
        Find(&achievements).
        Error

    res := make([]Achievement, len(achievements))
	for i, achievement := range achievements {
		res[i] = fromModel(&achievement)
	}

    return res, api.MakeServiceError(err)
}

func (gs *Repository) ProgressJoin(pid int64) ([]AchievementProgress, error) {
    var achievementProgresses []AchievementProgress

    err := gs.db.
        Table("achievements").
        Select("achievements.id, achievements.name, achievements.progress_required, player_has_category_achievement.progress").
        Joins("left join player_has_category_achievement on player_has_category_achievement.category=achievements.category").
        Where("player_has_category_achievement.player_id="+strconv.FormatInt(pid, 10)).
        Scan(&achievementProgresses).
        Error

    	if err != nil {
    		return nil, api.MakeServiceError(err)
    	}

    return achievementProgresses, nil
}

func (gs *Repository) Delete(id int64) error {
	db := gs.db.
		Where(&model.Achievement{ID: id}).
		Delete(&model.Achievement{})

	if db.Error != nil {
		return api.MakeServiceError(db.Error)
	} else if db.RowsAffected < 1 {
		return api.ErrNotFound
	}
	return nil
}

func (gs *Repository) Update(id int64, r *UpdateRequest) (Achievement, error) {

	var (
		achievement model.Achievement = model.Achievement{ID: id}
		err         error
	)

	err = gs.db.Model(&achievement).Updates(r).Error
	if err != nil {
		return Achievement{}, api.MakeServiceError(err)
	}

	return fromModel(&achievement), api.MakeServiceError(err)
}