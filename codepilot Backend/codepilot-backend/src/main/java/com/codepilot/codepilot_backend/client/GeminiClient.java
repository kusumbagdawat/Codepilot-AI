package com.codepilot.codepilot_backend.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class GeminiClient {

    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String apikey;

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

    public String generateResponse(String prompt){

        String requestBody= """
                {
                "contents":[
                {
                "parts":[
                {
                "text": "%s"
                }
               ]
              }
            ]
           }
           """.formatted(prompt.replace("\"","\\\""));

        return webClient.post()
                .uri(GEMINI_URL)
                .header("x-goog-api-key", apikey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .exchangeToMono(response ->
                        response.bodyToMono(String.class)
                                .map(body -> {
                                    System.out.println("=================================");
                                    System.out.println("Status : " + response.statusCode());
                                    System.out.println("Body   : " + body);
                                    System.out.println("=================================");
                                    return body;
                                })
                )
                .block();
    }
}
