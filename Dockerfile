FROM node:22-alpine AS builder

WORKDIR /build

COPY . .

RUN npm ci
RUN npm run build

FROM p3terx/darkhttpd:latest AS runner

COPY --from=builder /build/out /www

EXPOSE 3000

CMD ["/www", "--port", "3000", "--chroot", "--no-listing"]
