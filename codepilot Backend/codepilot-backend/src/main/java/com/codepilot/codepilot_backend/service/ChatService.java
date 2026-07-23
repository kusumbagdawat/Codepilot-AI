package com.codepilot.codepilot_backend.service;

import com.codepilot.codepilot_backend.client.GeminiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final GeminiClient geminiClient;
    private final ObjectMapper objectMapper=new ObjectMapper();

    public String chat(String message) {
        try {
            String response = geminiClient.generateResponse(message);
            JsonNode root = objectMapper.readTree(response);

            if (root.has("error")) {

                String errorMessage = root.path("error")
                        .path("message")
                        .asText();

                if (errorMessage.toLowerCase().contains("quota")) {
                    throw new RuntimeException("Daily AI limit reached. Please try again tomorrow.");
                }

                throw new RuntimeException(errorMessage);
            }

            return root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (RuntimeException e) {
            throw e;

        } catch (Exception e) {
            throw new RuntimeException("Unable to process AI response. Please try again.");
        }
    }
}
