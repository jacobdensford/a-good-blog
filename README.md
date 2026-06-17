![icon](icon128.png)

# A Good Blog

BADGES

<!-- What it does, why it does it that way, what problem it solves and how. -->

*Subtitle or slogan or something.*

A Good Blog is a multi-author blogging platform for small communities–including a back-end api, a client view, and an admin view. It uses [Express](https://expressjs.com/), [Prisma](), [Passport](), TKTK.

- TKTK
- TKTK
- TKTK

## Details

<!-- Architecture, implementation details, and features. -->

## Example

<!-- Screenshot(s) and links to live demo version. -->

## Usage

<!-- Use instructions for the end-user (readers, commenters, authors). -->

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
6. Set site name and copyright information in `/packages/shared/data/config.js`
7. TKTK

## Roadmap

## Contribution

If you would like to contribute to this project, please fork and make a pull request. Also, if you have suggestions or find bugs, please feel free to open an issue.

## License

[GNU GENERAL PUBLIC LICENSE](LICENSE)

## Contact

[hello@jacobdensford.com](mailto:hello@jacobdensford.com)

## Acknowledgements

<!-- List plugins and tools used (that aren't included in the actual stack laid out above) and people who have helped. -->

- TKTK
