export const matchData = [{
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
        teamName: 'São Paulo'
    },
    teamAway: {
        teamName: 'Grêmio'
    }
},
{
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
        teamName: 'São Paulo'
    },
    teamAway: {
        teamName: 'Grêmio'
    }
}];

export const matchesInProgress = [{
    id: 8,
    homeTeam: 15,
    homeTeamGoals: 0,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: {
        teamName: 'São José-SP'
    },
    teamAway: {
        teamName: 'Avaí/Kindermann'
    }
}]

export const matchesNotInProgress = [{
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: {
        teamName: 'São Paulo'
    },
    teamAway: {
        teamName: 'Grêmio'
    }
},
{
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: {
        teamName: 'Internacional'
    },
    teamAway: {
        teamName: 'Santos'
    }
},
{
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: {
        teamName: 'Corinthians'
    },
    teamAway: {
        teamName: 'Napoli-SC'
    }
},
{
    id: 4,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: {
        teamName: 'Botafogo'
    },
    teamAway: {
        teamName: 'Bahia'
    }
}]

export const matcheInserted = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true, 
}

export const insertMatche = {
    homeTeam: 16,
    awayTeam: 8,
    homeTeamsGoals: 2,
    awayTeamsGoals: 2,
}

export const matchesEqualsTeam = {
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 16,
    awayTeamGoals: 2,
}

export const matcheTeamNotExist = {
    homeTeam: 777,
    homeTeamGoals: 2,
    awayTeam: 44,
    awayTeamGoals: 2,
}

export const matcheUpdated = {
    homeTeamGoals: 7,
    awayTeamGoals: 6,
}
