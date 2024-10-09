package com.g2.t5;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class ProfileController {

    private RestTemplate restTemplate;

    @Autowired
    public ProfileController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/profile")
    public String showProfilePage(Model model, @CookieValue(name = "jwt", required = false) String jwt) {

        System.out.println("GET /profile, accesso alla pagina del profilo");

        // Creazione di una mappa per contenere i dati del form
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("jwt", jwt);

        // Chiamata al servizio per validare il token JWT
        Boolean isAuthenticated = restTemplate.postForObject("http://t23-g1-app-1:8080/validateToken", formData, Boolean.class);

        // Se il token non è valido, reindirizza l'utente alla pagina di login
        if (isAuthenticated == null || !isAuthenticated) {
            return "redirect:/login";
        }

        // Se l'utente è autenticato, mostra la pagina del profilo
        return "profile";
    }
}
