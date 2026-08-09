package com.codepilot.codepilot_backend.controller;

import com.codepilot.codepilot_backend.dto.ChatRequest;
import com.codepilot.codepilot_backend.dto.ChatResponse;
import com.codepilot.codepilot_backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "https://codepilot-frontend-wpdq.onrender.com"
        }
)
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request){
        String response = chatService.chat(request.message());

        return new ChatResponse(response);
    }
    @PostMapping("/code-review")
    public ChatResponse codeReview(@RequestBody ChatRequest request) {
        String prompt = """
                You are an expert software engineer.
                
                             Review the following code.
                
                             Return only:
                
                             1. Maximum 5 issues.
                             2. Maximum 5 suggestions.
                             3. Optimized version of the code.
                             4. Maximum 5 best practices.
                
                             Rules:
                             - Keep response under 300 words.
                             - Be concise.
                             - Use markdown headings.
                             - Do not add unnecessary explanations.
                
                             Code:
                             %s
""".formatted(request.message());
        return new ChatResponse(chatService.chat(prompt));
    }
    @PostMapping("/bug-finder")
    public ChatResponse bugFinder(@RequestBody ChatRequest request) {

        String prompt = """
                You are an expert debugging assistant.
                
                     Analyze the following code.
                
                     Return only:
                
                     ## Bugs Found
                     - Maximum 5 bugs
                
                     ## Reason
                     Explain each bug briefly.
                
                     ## Fixed Code
                     Provide corrected code only.
                
                     Rules:
                     - Keep response under 300 words.
                     - No unnecessary explanation.
                
                     Code:
                     %s
            """.formatted(request.message());

        return new ChatResponse(chatService.chat(prompt));
    }
    @PostMapping("/sql-generator")
    public ChatResponse sqlGenerator(@RequestBody ChatRequest request) {

        String prompt = """
                You are an SQL expert.
                
                   Generate only the SQL query.
                
                   Rules:
                   - Do not explain.
                   - Do not use markdown.
                   - Return only executable SQL.
                
                   Request:
                   %s
            """.formatted(request.message());

        return new ChatResponse(chatService.chat(prompt));
    }
    @PostMapping("/email-generator")
    public ChatResponse emailGenerator(@RequestBody ChatRequest request) {

        String prompt = """
                You are an expert email writer.
                
                   Generate a professional email.
                
                   Rules:
                   - Return only the email.
                   - Include subject.
                   - No explanation.
                   - Keep it under 250 words.
                
                   Details:
                   %s
            """.formatted(request.message());

        return new ChatResponse(chatService.chat(prompt));
    }
    @PostMapping("/documentation")
    public ChatResponse documentation(@RequestBody ChatRequest request) {

        String prompt = """
                Generate developer documentation for the following code.
                
                    Include only:
                
                    # Overview
                
                    # Parameters
                
                    # Returns
                
                    # Example
                
                    # Notes
                
                    Rules:
                    - Maximum 250 words.
                    - Use markdown headings.
                    - Keep it concise.
                
                    Code:
                    %s
            """.formatted(request.message());

        return new ChatResponse(chatService.chat(prompt));
    }
}
