function encodeUriComponents(comps) {
  return Object.entries(comps).map(e => encodeURIComponent(e[0]) + '=' + encodeURIComponent(e[1])).join('&');
}


function gitHubQuery(base, clauses) {
  return base + '?' + encodeUriComponents({
    utf8: '✓',
    q: clauses.join(' '),
  });
}

const pr = ["is:open", "is:pr", "archived:false"];
const issue = ["is:open", "is:issue", "archived:false"];
const ourRepos = ["repo:aws/aws-cdk", "repo:aws/jsii", , "repo:aws-samples/aws-cdk-examples", "repo:aws-samples/aws-cdk-intro-workshop"];
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
      href: gitHubQuery("https://github.com/issues", [...issue, ...ourRepos, "label:needs-triage"]),
      description: "Issues that need to be triaged",
    },
    {
      title: "response",
      href: gitHubQuery("https://github.com/issues", [...issue, ...ourRepos, "label:response-requested", ...sortByLeastRecentUpdates]),
      description: "Issues that need to be checked for a response",
    },
    {
      title: "closing",
      href: gitHubQuery("https://github.com/issues", [...issue, ...ourRepos, "label:closing-soon", ...sortByLeastRecentUpdates]),
      description: "Issues that need to be checked for a response if not close"
    },
    {
      title: "mine",
      href: gitHubQuery("https://github.com/issues", [...issue, ...ourRepos, "assignee:USERNAME"]),
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
