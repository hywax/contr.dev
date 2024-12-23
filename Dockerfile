ARG NODE=node:22.12.0-alpine

FROM $NODE AS builder

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

FROM $NODE

WORKDIR /app

COPY --from=builder /app/.output .

EXPOSE 3000

CMD ["/app/server/index.mjs"]
