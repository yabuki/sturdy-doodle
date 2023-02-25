# sturdy-doodle
DenoでPostgreSQLにダミーデータを入れ込む習作

- 試行錯誤したが、満たす前提条件を含めて、[Deploy to Deno Deploy](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-deno-deploy) のPrismaの部分を読んでおくと良い。

## deno のインストール

- [Installation | Manual | Deno](https://deno.land/manual@v1.30.3/getting_started/installation)

## prismaのセットアップ

- srcの下に移動する
- prismaをインストールする。deno task の prisma-init を実行してください。下記のような結果になります。
- 次に相対ディレクトリのprisma/schema.prismaを編集します。初期状態は下記です。

```jsonc
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

これを、下記のように書き換えます。
```jsonc
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["deno"]
  output          = "../generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model goods {
    id  Int     @id @default(autoincrement())
    name    String  @unique
    value   Int
}
```

- schemaをデータベースに反映する。`deno task prisma-db-push`
結果は下記のようになる。

```
$ deno task prisma-db-push

```
- その後、schema/prisma.schemaに書いてある output の場所に、必要なテンプレートコードを生成するために `deno task prisma-data-proxy`を実行する。この時、2023-02-25の時点ではnpmがないと失敗する。何らかの方法でnpmをインストールする必要は、前述の [Deploy to Deno Deploy](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-deno-deploy) にもあるとおり。わたしは、 [GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm) を利用したが、これに限らない。