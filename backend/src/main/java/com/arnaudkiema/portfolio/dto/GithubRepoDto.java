package com.arnaudkiema.portfolio.dto;

public record GithubRepoDto(
        String name,
        String description,
        String htmlUrl,
        String language,
        int stars,
        int forks
) {}
