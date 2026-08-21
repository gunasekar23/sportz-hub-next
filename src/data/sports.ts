import heroMatch from "@/assets/hero-match.jpg";
import newsTunnel from "@/assets/news-tunnel.jpg";
import newsBasketball from "@/assets/news-basketball.jpg";
import playerThorne from "@/assets/player-thorne.jpg";

export type League = "Premier League" | "NBA" | "La Liga";
export type Sport = "Football" | "Basketball";

export type Team = {
  id: string;
  name: string;
  abbr: string;
  league: League;
  sport: Sport;
  city: string;
  stadium: string;
  coach: string;
  founded: number;
  form: ("W" | "D" | "L")[];
};

export type Player = {
  id: string;
  name: string;
  number: number;
  position: string;
  teamId: string;
  nationality: string;
  age: number;
  image?: string;
  stats: { label: string; value: string }[];
};

export type MatchStatus = "live" | "upcoming" | "finished";

export type Match = {
  id: string;
  league: League;
  sport: Sport;
  status: MatchStatus;
  clock?: string;
  kickoff: string;
  venue: string;
  homeId: string;
  awayId: string;
  homeScore?: number;
  awayScore?: number;
  stats: { label: string; home: number; away: number; unit?: string }[];
  events: { minute: string; teamId: string; type: string; player: string }[];
};

export type NewsItem = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

export const teams: Team[] = [
  {
    id: "ars",
    name: "Arsenal FC",
    abbr: "ARS",
    league: "Premier League",
    sport: "Football",
    city: "London",
    stadium: "Emirates Stadium",
    coach: "Mikel Arteta",
    founded: 1886,
    form: ["W", "W", "D", "W", "L"],
  },
  {
    id: "mci",
    name: "Man City",
    abbr: "MCI",
    league: "Premier League",
    sport: "Football",
    city: "Manchester",
    stadium: "Etihad Stadium",
    coach: "Pep Guardiola",
    founded: 1880,
    form: ["W", "W", "W", "D", "W"],
  },
  {
    id: "liv",
    name: "Liverpool",
    abbr: "LIV",
    league: "Premier League",
    sport: "Football",
    city: "Liverpool",
    stadium: "Anfield",
    coach: "Arne Slot",
    founded: 1892,
    form: ["D", "W", "W", "L", "W"],
  },
  {
    id: "avl",
    name: "Aston Villa",
    abbr: "AVL",
    league: "Premier League",
    sport: "Football",
    city: "Birmingham",
    stadium: "Villa Park",
    coach: "Unai Emery",
    founded: 1874,
    form: ["L", "W", "W", "D", "L"],
  },
  {
    id: "ful",
    name: "Fulham",
    abbr: "FUL",
    league: "Premier League",
    sport: "Football",
    city: "London",
    stadium: "Craven Cottage",
    coach: "Marco Silva",
    founded: 1879,
    form: ["L", "D", "W", "L", "D"],
  },
  {
    id: "rma",
    name: "Real Madrid",
    abbr: "RMA",
    league: "La Liga",
    sport: "Football",
    city: "Madrid",
    stadium: "Santiago Bernabéu",
    coach: "Carlo Ancelotti",
    founded: 1902,
    form: ["W", "W", "W", "W", "D"],
  },
  {
    id: "bar",
    name: "Barcelona",
    abbr: "BAR",
    league: "La Liga",
    sport: "Football",
    city: "Barcelona",
    stadium: "Estadi Olímpic",
    coach: "Hansi Flick",
    founded: 1899,
    form: ["W", "L", "W", "W", "W"],
  },
  {
    id: "lal",
    name: "LA Lakers",
    abbr: "LAL",
    league: "NBA",
    sport: "Basketball",
    city: "Los Angeles",
    stadium: "Crypto.com Arena",
    coach: "JJ Redick",
    founded: 1947,
    form: ["W", "L", "W", "W", "L"],
  },
  {
    id: "gsw",
    name: "Golden State",
    abbr: "GSW",
    league: "NBA",
    sport: "Basketball",
    city: "San Francisco",
    stadium: "Chase Center",
    coach: "Steve Kerr",
    founded: 1946,
    form: ["W", "W", "L", "W", "W"],
  },
  {
    id: "phx",
    name: "Phoenix Suns",
    abbr: "PHX",
    league: "NBA",
    sport: "Basketball",
    city: "Phoenix",
    stadium: "Footprint Center",
    coach: "Mike Budenholzer",
    founded: 1968,
    form: ["L", "L", "W", "D", "W"],
  },
];

export const players: Player[] = [
  {
    id: "thorne",
    name: "Julian Thorne",
    number: 10,
    position: "Midfielder",
    teamId: "ars",
    nationality: "England",
    age: 24,
    image: playerThorne,
    stats: [
      { label: "Goals", value: "14" },
      { label: "Asts", value: "9" },
      { label: "Pass", value: "92%" },
    ],
  },
  {
    id: "sterling",
    name: "Leo Sterling",
    number: 7,
    position: "Forward",
    teamId: "mci",
    nationality: "Brazil",
    age: 27,
    stats: [
      { label: "Goals", value: "22" },
      { label: "Asts", value: "6" },
      { label: "Shots", value: "88" },
    ],
  },
  {
    id: "vance",
    name: "Owen Vance",
    number: 4,
    position: "Defender",
    teamId: "liv",
    nationality: "Netherlands",
    age: 29,
    stats: [
      { label: "Tackles", value: "71" },
      { label: "Duels", value: "68%" },
      { label: "Clean", value: "12" },
    ],
  },
  {
    id: "moreno",
    name: "Diego Moreno",
    number: 9,
    position: "Forward",
    teamId: "rma",
    nationality: "Spain",
    age: 26,
    stats: [
      { label: "Goals", value: "19" },
      { label: "Asts", value: "11" },
      { label: "xG", value: "17.4" },
    ],
  },
  {
    id: "brooks",
    name: "Marcus Brooks",
    number: 23,
    position: "Guard",
    teamId: "lal",
    nationality: "USA",
    age: 25,
    stats: [
      { label: "PPG", value: "27.4" },
      { label: "APG", value: "7.1" },
      { label: "FG%", value: "48" },
    ],
  },
  {
    id: "reyes",
    name: "Andre Reyes",
    number: 30,
    position: "Forward",
    teamId: "gsw",
    nationality: "USA",
    age: 31,
    stats: [
      { label: "PPG", value: "24.8" },
      { label: "RPG", value: "9.3" },
      { label: "3P%", value: "41" },
    ],
  },
];

export const matches: Match[] = [
  {
    id: "ars-mci",
    league: "Premier League",
    sport: "Football",
    status: "live",
    clock: "76'",
    kickoff: "Today 20:00",
    venue: "Emirates Stadium",
    homeId: "ars",
    awayId: "mci",
    homeScore: 2,
    awayScore: 1,
    stats: [
      { label: "Possession", home: 42, away: 58, unit: "%" },
      { label: "Shots on target", home: 7, away: 4 },
      { label: "Corners", home: 5, away: 8 },
      { label: "Pass accuracy", home: 86, away: 91, unit: "%" },
    ],
    events: [
      { minute: "12'", teamId: "ars", type: "Goal", player: "J. Thorne" },
      { minute: "38'", teamId: "mci", type: "Goal", player: "L. Sterling" },
      { minute: "64'", teamId: "ars", type: "Goal", player: "J. Thorne" },
      { minute: "71'", teamId: "mci", type: "Yellow card", player: "R. Ortiz" },
    ],
  },
  {
    id: "lal-gsw",
    league: "NBA",
    sport: "Basketball",
    status: "live",
    clock: "Q4 4:12",
    kickoff: "Today 19:30",
    venue: "Crypto.com Arena",
    homeId: "lal",
    awayId: "gsw",
    homeScore: 108,
    awayScore: 112,
    stats: [
      { label: "Field goal", home: 46, away: 51, unit: "%" },
      { label: "Rebounds", home: 38, away: 44 },
      { label: "Assists", home: 21, away: 27 },
      { label: "Turnovers", home: 14, away: 9 },
    ],
    events: [
      { minute: "Q1", teamId: "lal", type: "Lead change", player: "M. Brooks" },
      { minute: "Q3", teamId: "gsw", type: "Run 12-0", player: "A. Reyes" },
    ],
  },
  {
    id: "rma-bar",
    league: "La Liga",
    sport: "Football",
    status: "upcoming",
    kickoff: "Today 21:00",
    venue: "Santiago Bernabéu",
    homeId: "rma",
    awayId: "bar",
    stats: [
      { label: "Season form", home: 13, away: 11 },
      { label: "Goals scored", home: 61, away: 58 },
    ],
    events: [],
  },
  {
    id: "liv-avl",
    league: "Premier League",
    sport: "Football",
    status: "upcoming",
    kickoff: "Sat 15:30",
    venue: "Anfield",
    homeId: "liv",
    awayId: "avl",
    stats: [
      { label: "Season form", home: 12, away: 9 },
      { label: "Goals scored", home: 55, away: 47 },
    ],
    events: [],
  },
  {
    id: "mci-ful",
    league: "Premier League",
    sport: "Football",
    status: "upcoming",
    kickoff: "Sun 17:00",
    venue: "Etihad Stadium",
    homeId: "mci",
    awayId: "ful",
    stats: [
      { label: "Season form", home: 14, away: 6 },
      { label: "Goals scored", home: 72, away: 38 },
    ],
    events: [],
  },
  {
    id: "lal-phx",
    league: "NBA",
    sport: "Basketball",
    status: "upcoming",
    kickoff: "Sat 02:00",
    venue: "Crypto.com Arena",
    homeId: "lal",
    awayId: "phx",
    stats: [
      { label: "Season wins", home: 41, away: 33 },
      { label: "Points per game", home: 114, away: 109 },
    ],
    events: [],
  },
  {
    id: "bar-avl",
    league: "La Liga",
    sport: "Football",
    status: "finished",
    kickoff: "Wed 20:45",
    venue: "Estadi Olímpic",
    homeId: "bar",
    awayId: "rma",
    homeScore: 1,
    awayScore: 3,
    stats: [
      { label: "Possession", home: 55, away: 45, unit: "%" },
      { label: "Shots on target", home: 5, away: 9 },
      { label: "Corners", home: 6, away: 4 },
    ],
    events: [
      { minute: "22'", teamId: "rma", type: "Goal", player: "D. Moreno" },
      { minute: "57'", teamId: "bar", type: "Goal", player: "P. Vidal" },
      { minute: "80'", teamId: "rma", type: "Goal", player: "D. Moreno" },
    ],
  },
];

export type StandingRow = {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
};

export const standings: Record<League, StandingRow[]> = {
  "Premier League": [
    { teamId: "ars", played: 32, won: 24, drawn: 6, lost: 2, gd: 48, points: 78 },
    { teamId: "mci", played: 32, won: 24, drawn: 5, lost: 3, gd: 51, points: 77 },
    { teamId: "liv", played: 32, won: 22, drawn: 8, lost: 2, gd: 42, points: 74 },
    { teamId: "avl", played: 32, won: 20, drawn: 7, lost: 5, gd: 21, points: 67 },
    { teamId: "ful", played: 32, won: 12, drawn: 9, lost: 11, gd: -3, points: 45 },
  ],
  "La Liga": [
    { teamId: "rma", played: 31, won: 25, drawn: 4, lost: 2, gd: 53, points: 79 },
    { teamId: "bar", played: 31, won: 22, drawn: 5, lost: 4, gd: 44, points: 71 },
  ],
  NBA: [
    { teamId: "gsw", played: 74, won: 48, drawn: 0, lost: 26, gd: 312, points: 48 },
    { teamId: "lal", played: 74, won: 45, drawn: 0, lost: 29, gd: 208, points: 45 },
    { teamId: "phx", played: 74, won: 38, drawn: 0, lost: 36, gd: 44, points: 38 },
  ],
};

export const news: NewsItem[] = [
  {
    id: "playmaker",
    category: "Exclusive",
    title: "The Rise of the Modern Playmaker: Analyzing the League's Evolution",
    excerpt:
      "How advanced tracking data is changing the way coaches evaluate tactical intelligence and positional fluidity in the final third.",
    readTime: "5 Min Read",
    image: heroMatch,
    featured: true,
  },
  {
    id: "transfer",
    category: "Transfer Market",
    title: "Thorne contract extension: everything we know so far",
    excerpt:
      "Arsenal have opened talks over a long-term deal as rival clubs circle ahead of the summer window.",
    readTime: "3 Min Read",
    image: newsTunnel,
  },
  {
    id: "nba-bracket",
    category: "NBA Playoffs",
    title: "Can Golden State repeat? Tactical breakdown of the Western bracket",
    excerpt:
      "Switch-heavy defense and a resurgent bench have reshaped the conference favourites in the closing weeks.",
    readTime: "6 Min Read",
    image: newsBasketball,
  },
];

export const leagues: League[] = ["Premier League", "La Liga", "NBA"];

export function teamById(id: string) {
  return teams.find((t) => t.id === id);
}

export function playerById(id: string) {
  return players.find((p) => p.id === id);
}

export function matchById(id: string) {
  return matches.find((m) => m.id === id);
}

export function playersByTeam(teamId: string) {
  return players.filter((p) => p.teamId === teamId);
}

export function matchesByTeam(teamId: string) {
  return matches.filter((m) => m.homeId === teamId || m.awayId === teamId);
}
