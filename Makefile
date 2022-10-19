.PHONY: image pb deploy

image:
	pnpm build
	node workbox-build.mjs
	node zip.mjs
	docker build -t hub.lubui.com/hackbook-vue .
	docker push hub.lubui.com/hackbook-vue

deploy:
	sudo kubectl scale --replicas=0 deployment hackbook-vue
	sudo kubectl scale --replicas=1 deployment hackbook-vue

pb:
	pnpm pb
	sed -i "" "s|import \* as Long from|import Long from|" src/api/abi.ts
