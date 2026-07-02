# Discussion App Release Notes

The main entry point of the app is the list of discussions. From there, signed-in (and registered against the GDS app) users can:

- Create a new discussion
- Filter discussions by categories
- Search for discussions and answers (search yet to be implemented)

The discussion list presents the discussions in a list-item format. Each item displays the discussion title, the number of comments, the number of upvotes, the author, the creating date, number of participants (with their avatar), and some specific attributes depending on the category of discussion.

> ![discussion discussion list](https://github.com/preignition/public/assets/1168053/1e1cd53e-4092-4568-b0e6-9e89873c1a10)
> Screenshot of the list item - different categories are displayed the left

The discussion app has 3 levels of content. The highest level is a **discussion**. A discussion is a topic that can be discussed. A discussion can have multiple **comments**. A comment is a response to a discussion. A comment can have multiple **replies**. A reply is a response to a comment.

Discussions are grouped by **categories**. A category is a group of discussions. Categories are managed by the GDS secretariat. Available categories are:

- `General` for general discussions
- `Questions` for questions questions and answers
- `Ideas` for sharing ideas
- `Feedback` for sharing feedback
- `Bug` report for reporting bugs
- `Announcements` for channel owner to make announcements
- `Polls` for taking short polls within a community (not yet implemented)

## Main features

The GDS secretariat can add or remove categories, but `General`, `Announcements` and `Questions` are always displayed.

>![discussion category](https://github.com/preignition/public/assets/1168053/f3c9db9a-7bcc-4de9-a620-e4c51ff3a310)
>
> Screenshot for choosing a category when creating a discussion

When a user clicks on a discussion, the discussion details are displayed. The discussion details include the discussion title, the discussion content, the number of upvotes, the number of comments, the author, the creation date, and the last update date. The discussion details also display the comments. Each comment displays the author, the creation date, the content, the number of upvotes, and the replies.

>![discussion start a discussion](https://github.com/preignition/public/assets/1168053/a4d12999-827c-48b8-a17f-e71f8246530b)
>
> Screenshot when a user starts a discussion

Content is written in markdown. This allows to easily format the content, add links, images or videos. The rendering of content can be previewed before posting.

> ![discussion comment](https://github.com/preignition/public/assets/1168053/8d284709-287a-44e7-a066-ee08685f0ea2)
>
> Screenshot of a comment

Some categories have special behaviors. For instance only the GDS secretariat or  can create discussion is the `Announcement` category.

For `Question` category type (as well as `general`, `feedback` and `ideas`), the discussion is automatically marked as `not answered` when created. The author of the discussion can mark the discussion as `answered` by selecting a comment as the answer. Whether a discussion is answered or not is displayed in the discussion list. The answer to the question appears at the top of the comments, and is highlighted.

> ![discussion answered discussion](https://github.com/preignition/public/assets/1168053/12150e2e-d9a9-4d13-b4da-4d7f34d8032e)
>
> Screenshot of an answered question

Users can react to content items. Discussions and comments can be upvoted. This aims at promoting the most relevant content and to show appreciation. It is further possible to react to discussions, comments and replies with emojis. The emojis are displayed below the content item. The following emojis are available: `like`, `dislike`, `laugh`, `hooray`, `love`, `confused`, `looking at this`. Users see their own reactions (highlighted in the main application color) and the reactions of other users (counted by reaction).

> ![discussion reaction](https://github.com/preignition/public/assets/1168053/5a384101-ed9c-4af9-833c-0b7058cd717b)
> Screenshot of the emojis, with the `hooray` emoji selected

Owners of content items can also edit or delete their content. Anyone can mark a content as not appropriate. The content is then hidden and the channel owner is notified. The GDS Secretariat can then decide to delete the content or to unhide it and/or ban a user for a specific period of time.

> ![discussion card menu](https://github.com/preignition/public/assets/1168053/4e533851-6e8a-4306-a950-bfdfe6d8a143)
>
> Screenshot of the menu when clicking on the 3 dots on the right of a content item

Users can subscribe to discussions. When a user subscribes to a discussion, they receive an email notification when a content is added to the discussion. The owner of the discussion is automatically subscribed to the discussion, as well as any contributor to the discussion (post a comment, or a reply).

Members of the GDS app (e.g. all users who are able to add commitments) are automatically subscribed announcements. They receive an email notification when a new announcement is posted. This is a way to keep the community informed of the latest news.

> ![discussion email](https://github.com/preignition/public/assets/1168053/e6c7fb70-a08b-4e57-bd25-8c40503dd7fe)
> Screenshot of an email received when a user is subscribed to a discussion

Any user can subscribe to a discussion to receive notifications when a new comment is added.

Replying to the email will add the reply to the discussion thread.

GDS secretariat automatically receives an email notification when any content is created in the channel.

Any subscription can ber muted (you will not receive any email notification) or deleted.

It is possible for GDS secretariat to pin certain discussions to the top of the list. Pinned discussions are displayed at the top of the list, and are highlighted.

> ![discussion-pinned](https://github.com/preignition/public/assets/1168053/e83df705-5a8b-448f-88e7-15acfcd65c47)
>
> Screenshot of a pinned discussion, appearing at the top of the app.

## Accessibility

The discussion app strives to follow accessibility best practice and standards. At the time of this early release, accessibility testing is done in-house.

Discussion items, comments and replies are aware of which accessibility settings are being activated on the platform. For instance, [is is possible to use specific class to show or hide content depending on activation of accessibility settings](https://accessiblesurveys.com/s/help/documentation/faq/md/accessibility-mode.md).

We are interested to hear from you if you have any further accessibility requirements or feedback. There might be use cases we have not yet considered or thought of. For instance, would read-aloud be useful, or should we allow voice-based posts, or shall the `easyread` mode further simplify the current interface ?

### Interactive Help

The discussion app includes an interactive help. The help is available from the main menu, or on the press of the `F1` key. It is also activated the first time a user lands on the app. The help is context-sensitive and provides information about the current page.

> ![discussion interactive help](https://github.com/preignition/public/assets/1168053/8a8fc9d0-645b-4358-b86b-1a00398c2ce1)
>
> Screenshot of the interactive help

### Yet to come

This is an early release of the discussion app. We are still working on the following features:

- Search for discussions and answers
- Persist draft locally (before posting) so that the user does not lose their content if they navigate away from the page
- Better handle potential flagged/inappropriate content moderation
- Implement manual subscription to channel and discussion, so that users can receive notifications for all new content in a channel or a discussion
