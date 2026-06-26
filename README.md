![icon](icon128.png)

# A Good Blog

<!-- BADGES -->

<!-- What it does, why it does it that way, what problem it solves and how; written in about three sentences. (Can potentially use this for my three bullet points in my resume, etc.) -->

<!-- *Subtitle or slogan or something.* This will be the same thing that I put for the description -->

A Good Blog is a full-stack blogging platform for [the good web](https://web.cobb.land) that enables personal content ownership for individual bloggers, small communities, and independent publications. It includes two separate frontends—one for reading, another for admin—and a RESTful API backend, built using [PostgreSQL](https://www.postgresql.org/), [Express](https://expressjs.com/), [React](https://react.dev/), and [Node.js](https://nodejs.org/en).

<!-- ## Details

Architecture, implementation details, and features.

It uses , [Prisma](), [Passport](), TKTK.

- TKTK
- TKTK
- TKTK -->

## Example

<!-- Screenshot(s) and links to live demo version. -->

<!-- ![Screenshot of A Good Blog homepage](screenshot.jpg) -->

Visit [blog.densford.net](https://blog.densford.net) to see A Good Blog in action.

## Usage

<!-- Use instructions for the end-user (readers, commenters, authors). -->

- Find your way around A Good Blog by using the navigation bar, which is visible at the top of every page.
- You start the homepage, where you can see details about the blog you're visiting, as well as the latest few posts. Return there at any time by clicking `Home` in the navigation menu at the top of any page.
<!-- - TKTK -->

## Setup

1. Clone this repository (`git clone [repo]`) and install (`npm install`)
2. Ensure you have postgresql installed and configured
3. Create `/apps/blog-api/.env` and add the following variables:
    - `DATABASE_URL`: The url to your database
    - `PORT`: The port for your api, typically 3000
    - `AUTHOR_PASS`: A password to grant a user author status (currently unused)
    - `ADMIN_PASS`: A password to grant a user admin status (currently unused)
    - `CLIENT_URL`: A space separated list of acceptable URLs for clients of the API using regex (typically including "^http:\/\/localhost:\d+$" for development)
4. From within `/apps/blog-api` run `npx prisma migrate dev --name init` and then `npx prisma generate`
5. Change variables in `.env.production` in both `/apps/blog-public` and `/apps/blog-admin` to match your hosted domain
6. Set site name, about, and copyright information in `/packages/shared/data/config.js`
<!-- 7. TKTK -->

## Roadmap

- Consider switching from ngnix to [Caddy](https://caddyserver.com/)

## Contribution

If you would like to contribute to this project, please fork and make a pull request. Also, if you have suggestions or find bugs, please feel free to open an issue.

## License

[GNU GENERAL PUBLIC LICENSE](LICENSE)

## Contact

[hello@jacobdensford.com](mailto:hello@jacobdensford.com)

<!-- ## Acknowledgements

List plugins and tools used (that aren't included in the actual stack laid out above) and people who have helped.

- TKTK -->
