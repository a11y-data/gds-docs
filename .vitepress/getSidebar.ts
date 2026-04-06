export function getSidebar() {
  return [
    {
      text: 'Portal', link: '/index',
      items: [
        { text: 'Tutorials', link: '/tutorial/index' },
        {
          text: 'How-to Guides', link: 'index', base: '/how-to/', collapsed: true, items: [
            { text: 'Create an Account', link: 'create-account' },
            { text: 'Complete your Account ', link: 'incomplete-account' },
            { text: 'Add a Member', link: 'add-member' },
            { text: 'Create a Commitment', link: 'create-commitment' },
            { text: 'Submit a Commitment', link: 'submit-commitment' },
            { text: 'Start Reporting', link: 'start-reporting' },
            { text: 'Submit a Report', link: 'submit-reporting' },

          ]
        },
        {
          text: 'Reference', base: '/reference/', collapsed: true, link: 'index', items: [
            { text: 'Home', link: 'home/index' },
            {
              text: 'My Space', base: '/reference/space/', link: 'index', collapsed: true, items: [
                { text: 'Welcome', link: 'welcome' },
                { text: 'Discover', link: 'discover' },
                { text: 'Commitments', link: 'commitment' },
                { text: 'New Commitment', link: 'new-commitment' },
                { text: 'Reporting', link: 'report' },
                { text: 'Messages', link: 'communication' },
                { text: 'Organisation', link: 'organisation' },
                { text: 'Team', link: 'team' },
              ]
            }
          ]
        },
      ]
    },

    {
      text: 'APIs',
      items: [
      ]
    }
  ]
}
