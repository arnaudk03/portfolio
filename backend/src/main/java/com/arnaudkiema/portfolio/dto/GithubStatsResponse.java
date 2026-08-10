package com.arnaudkiema.portfolio.dto;

import java.util.List;

public record GithubStatsResponse(
        String username,
        int publicRepos,
        int followers,
        int following,
        List<GithubRepoDto> repos
) {}
