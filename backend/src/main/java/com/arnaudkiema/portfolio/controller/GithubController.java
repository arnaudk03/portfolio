package com.arnaudkiema.portfolio.controller;

import com.arnaudkiema.portfolio.dto.GithubStatsResponse;
import com.arnaudkiema.portfolio.service.GithubService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GithubController {

    private final GithubService githubService;

    public GithubController(GithubService githubService) {
        this.githubService = githubService;
    }

    @GetMapping("/github/stats")
    public ResponseEntity<GithubStatsResponse> getStats(
            @RequestParam(defaultValue = "arnaudkiema") String username) {
        return ResponseEntity.ok(githubService.getStats(username));
    }
}
