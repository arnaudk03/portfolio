package com.arnaudkiema.portfolio.controller;

import com.arnaudkiema.portfolio.dto.ApiResponse;
import com.arnaudkiema.portfolio.dto.ContactRequest;
import com.arnaudkiema.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> sendContact(@Valid @RequestBody ContactRequest request) {
        contactService.sendContactMessage(request);
        return ResponseEntity.ok(new ApiResponse("Message sent successfully"));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse> health() {
        return ResponseEntity.ok(new ApiResponse("OK"));
    }
}
