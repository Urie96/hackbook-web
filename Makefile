.PHONY: image

image:
	pnpm build
	node workbox-build.mjs
	node zip.mjs
	docker build -t hub.lubui.com/hackbook-vue .
	docker push hub.lubui.com/hackbook-vue