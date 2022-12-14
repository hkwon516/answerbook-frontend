**Description**

Answerbook supports students by
presenting personalized study plans to individuals based on reliable
big data for free, easy, and fast. I was able to raise $30k in funding from an edutech company in South Korea with Answerbook.

How does it work? Students use their phones and
do a barcode recognition of the textbook. Then it automatically
collects the textbook’s name, subject, and difficulty that are
stored in the barcode(ISBN). As it accumulates, it tracks the student’s study
pattern and time by total, subject, textbook, difficulty categories.
Then when it comes to an one year portfolio and is able to track
where students are at the end of the year, it gets able to modelized
their study pattern by different grades and positions. Then individual
students can compare and contrast with their goal model and get
specific plans about how much they have to study and how they
have to study.

We will have our front-end codebase public whereas our back-end private for safety issues.

**Commands**

> First time developers  
> `npm run setup`

| Command Name                                              | Command              | Description                     |
| --------------------------------------------------------- | -------------------- | ------------------------------- |
| Bootstrap                                                 | `npm run bootstrap`  | install dependency all packages |
| Build                                                     | `npm run build`      | build all packages              |
| Setup                                                     | `npm run setup`      | sets the entire project up      |
| **Development**                                           |
| Admin Development                                         | `npm run admin dev`  | start admin development server  |
| WebApp Development                                        | `npm run webapp dev` | start admin development server  |
| _all the above commands needs to be ran from root folder_ |

**Notes**

Git Commit message format

```
<packageName> <technology> <component> <title>
<description>

E.g.

Add new npm devDependency at Lerna Root.

root - npm - script - setup

Adding new cta button in webapp

webapp - homePage - heroComponent - cta
Added a new CTA button called buy now on home page for christmas celebration in the top heropart
```
