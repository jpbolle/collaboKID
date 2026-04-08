const questions = [
    {
        id: 1,
        question: "Quand vous participez à un projet interdisciplinaire, comment appréciez-vous que soient réparties les tâches ?",
        options: [
            { text: "Chacun gère son domaine de manière indépendante, sans réel échange sur les méthodes ou les objectifs.", type: "Cohabitation" },
            { text: "Nous répartissons les tâches clairement, et chacun les réalise en autonomie, tout en assurant une cohérence globale.", type: "Coordination" },
            { text: "Nous réfléchissons, décidons et construisons ensemble chaque étape du projet.", type: "Co-élaboration" },
            { text: "Chacun donne des idées ou des ressources à ses collègues, mais chacun reste responsable de sa partie.", type: "Contribution" },
            { text: "Nous nous consultons pour ajuster nos apports, mais chaque personne conserve sa propre méthodologie.", type: "Coopération" }
        ]
    },
    {
        id: 2,
        question: "Un élève a un souci au sein de la classe. Comment cherchez-vous des solutions ?",
        options: [
            { text: "Nous convenons d’une réponse globale en organisant nos interventions respectives.", type: "Coordination" },
            { text: "Je cherche de mon côté des solutions pour l'aider ; mes collègues font de même.", type: "Cohabitation" },
            { text: "Je partage mon approche avec mes collègues mais sans chercher à l'améliorer en équipe.", type: "Contribution" },
            { text: "Nous réfléchissons et concevons ensemble des pistes d'aide à lui proposer.", type: "Co-élaboration" },
            { text: "Nous échangeons nos idées d'aide et ajustons nos solutions pour qu’elles soient complémentaires.", type: "Coopération" }
        ]
    },
    {
        id: 3,
        question: "Comment se déroule la communication au sein de votre équipe disciplinaire ?",
        options: [
            { text: "Entre collègues, on s'informe des projets de chacun, on s'échange des infos de manière irrégulière.", type: "Contribution" },
            { text: "Nous organisons régulièrement des discussions pour améliorer nos contributions respectives.", type: "Coopération" },
            { text: "La communication est systématique et sert à enrichir le travail commun.", type: "Co-élaboration" },
            { text: "Nous échangeons régulièrement pour aligner nos actions, on se partage des documents.", type: "Coordination" },
            { text: "La communication est rare ou inexistante, chacun se concentre sur son propre travail.", type: "Cohabitation" }
        ]
    },
    {
        id: 4,
        question: "Quand vous créez une séquence de cours, comment cela se passe-t-il ?",
        options: [
            { text: "Nous construisons la séquence de cours ensemble, chaque étape étant le fruit d’un travail collectif.", type: "Co-élaboration" },
            { text: "Chaque professeur peut apporter, s'il le souhaite, des idées ou des documents que les autres peuvent utiliser.", type: "Contribution" },
            { text: "Nous partageons nos idées, et chacun produit une partie du cours en tenant compte des retours des autres.", type: "Coopération" },
            { text: "Chaque professeur est maître du parcours pédagogique proposé à la classe, il crée seul ses séquences.", type: "Cohabitation" },
            { text: "Nous convenons en équipe d’une structure de cours mais chacun crée en fonction de sa sensibilité son propre cours.", type: "Coordination" }
        ]
    },
    {
        id: 5,
        question: "Comment abordez-vous une évaluation commune pour un projet d’équipe ?",
        options: [
            { text: "Chaque professeur évalue indépendamment des autres.", type: "Cohabitation" },
            { text: "Nous fixons les critères d'évaluation et échangeons pour nous ajuster mutuellement.", type: "Coopération" },
            { text: "Nous fixons ensemble les critères mais évaluons séparément.", type: "Coordination" },
            { text: "Nous construisons et réalisons ensemble une évaluation collective.", type: "Co-élaboration" },
            { text: "Je partage mes critères ou mes outils avec mes collègues.", type: "Contribution" }
        ]
    }
];

const profiles = {
    "Cohabitation": "Chacun travaille de son côté. Il s’agit d’une simple co-présence sans réelle collaboration.",
    "Contribution": "Chacun apporte des ressources ou idées, mais sans construction commune approfondie.",
    "Coordination": "Les tâches sont réparties et organisées. Chacun travaille de manière autonome mais alignée.",
    "Coopération": "Les enseignants échangent et ajustent leurs pratiques, tout en gardant une certaine autonomie.",
    "Co-élaboration": "Les enseignants construisent ensemble toutes les étapes. Il y a une véritable co-création et interdépendance."
};

module.exports = { questions, profiles };
