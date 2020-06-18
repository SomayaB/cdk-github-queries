function encodeUriComponents(comps) {
  return Object.entries(comps).map(e => encodeURIComponent(e[0]) + '=' + encodeURIComponent(e[1])).join('&');
}


function gitHubQuery(base, clauses) {
  return base + '?' + encodeUriComponents({
    utf8: '✓',
    q: clauses.join(' '),
  });
}

const filterInTeamAuthors = ["author:eladb", "author:rix0rrr", "author:shivlaks", "author:nijaat", "author:RomainMuller", "author:skinny85", "author:NetaNir","author:MrArnoldPalmer", "author:iliapolo", "author:JerryAWS", "author:NGL321", "author:SomayaB", "author:garnaat", "author:costleya", "author:bmaizels", "author:ccfife", "author:fulghum", "author:pkandasamy91", "author:SoManyHs", "author:uttarasridhar"];
const filterOutTeamAuthors = ["-author:eladb", "-author:rix0rrr", "-author:shivlaks", "-author:nija-at", "-author:RomainMuller", "-author:skinny85", "-author:NetaNir","-author:MrArnoldPalmer", "-author:iliapolo", "-author:Jerry-AWS", "-author:NGL321", "-author:SomayaB", "-author:garnaat", "-author:costleya", "-author:bmaizels", "-author:ccfife", "-author:fulghum", "-author:pkandasamy91", "-author:SoManyHs", "-author:uttarasridhar"];
const filterInTeamComments = ["commenter:eladb", "commenter:rix0rrr", "commenter:shivlaks", "commenter:nija-at", "commenter:RomainMuller", "commenter:skinny85", "commenter:NetaNir","commenter:MrArnoldPalmer", "commenter:iliapolo", "commenter:Jerry-AWS", "commenter:NGL321", "commenter:SomayaB", "commenter:garnaat", "commenter:costleya", "commenter:bmaizels", "commenter:ccfife", "commenter:fulghum", "commenter:pkandasamy91", "commenter:SoManyHs", "commenter:uttarasridhar"]
const filterOutTeamComments = ["-commenter:eladb", "-commenter:rix0rrr", "-commenter:shivlaks", "-commenter:nija-at", "-commenter:RomainMuller", "-commenter:skinny85", "-commenter:NetaNir","-commenter:MrArnoldPalmer", "-commenter:iliapolo", "-commenter:Jerry-AWS", "-commenter:NGL321", "-commenter:SomayaB","-commenter:ccfife", "f-commenter:ulghum", "-commenter:pkandasamy91", "-commenter:SoManyHs", "-commenter:uttarasridhar"];
const pr = ["is:open", "is:pr", "archived:false"];
const issue = ["is:open", "is:issue", "archived:false"];
const ourRepos = ["repo:aws/aws-cdk", "repo:aws/jsii", "repo:aws-samples/aws-cdk-examples", "repo:aws-samples/aws-cdk-intro-workshop", "repo:awslabs/cdk8s"];
const hideInProgress = [ "-label:status/in-progress" ];
const sortByOldestFirst = [ "sort:created-asc" ];
const sortByRecentUpdates = [ "sort:updated-desc" ];
const sortByLeastRecentUpdates = [ "sort:updated-asc" ];

const LINKS = [
  [
    { title: "PRs", classes: "narrow" },
    {
      title: "Total",
      href: gitHubQuery("https://github.com/pulls", [...pr, ...ourRepos, "no:assignee"]),
      description: "Pull requests that need to be assigned to the area owner",
    },
    {
      title: "cdk",
      href: "https://github.com/aws/aws-cdk/pulls?q=is:open+is:pr+no:assignee"
    },
    {
      title: "jsii",
      href: "https://github.com/aws/jsii/pulls?q=is:open+is:pr+no:assignee"
    },
    {
      title: "examples",
      href: "https://github.com/aws-samples/aws-cdk-examples/pulls?q=is:open+is:pr+no:assignee"
    },
    {
      title: "workshop",
      href: "https://github.com/aws-samples/aws-cdk-intro-workshop/pulls?q=is:open+is:pr+no:assignee"
    },
    {
      title: "cdk8s",
      href: "https://github.com/awslabs/cdk8s/pulls?q=is:open+is:pr+no:assignee"
    }
  ],
  [
    { title: "Issues", classes: "narrow" },
    {
      title: "UA",
      href: gitHubQuery("https://github.com/issues", [...issue, ...ourRepos, "no:assignee"]),
      description: "Issues that need to be assigned to the area owner"
    },
    {
      title: "UT",
      href: gitHubQuery("https://github.com/issues", [...issue, ...ourRepos, "label:needs-triage", ...filterOutTeamAuthors, "comments:0"]),
      description: "Issues that need to be triaged by me"
    },
    {
      title: "UT2",
      href: gitHubQuery("https://github.com/issues", [...issue, ...ourRepos, "label:needs-triage", ...filterOutTeamComments, ...filterOutTeamAuthors]),
      description: "Issues that need to be triaged by me"
    },
    {
      title: "TR",
      href: gitHubQuery("https://github.com/issues", [...issue, ...ourRepos, "label:needs-triage", ...filterInTeamComments, ...filterInTeamAuthors]),
      description: "Issues that need to be marked as triaged",
    },
    {
      title: "mine",
      href: gitHubQuery("https://github.com/issues", ["is:open", ...ourRepos, "assignee:USERNAME"]),
      description: "Issues you need to work on"
    },
  ],
  [
    {
      title: 'Mentions',
      href: 'https://github.com/notifications'
    },
    {
      title: 'Workflow',
      href: 'https://github.com/aws/aws-cdk/wiki/Triage-Workflow'
    }
  ]
];
