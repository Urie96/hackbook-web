import { ref } from 'vue';

export const isFullScreen = ref(false);

const d = document as any;

window.onresize = function () {
    isFullScreen.value =
        d.fullScreenElement === html ||
        d.msFullscreenElement === html ||
        d.mozFullScreenElement === html ||
        d.webkitFullscreenElement === html ||
        false;
}

const cfs =
    d.exitFullscreen ||
    d.mozCancelFullScreen ||
    d.webkitExitFullscreen ||
    d.msExitFullscreen;

const html = d.documentElement;
const rfs =
    html.requestFullScreen ||
    html.webkitRequestFullScreen ||
    html.mozRequestFullScreen ||
    html.msRequestFullScreen;

export const canFullScreen = ref(!!rfs);

export const toggleFullScreen = () => {
    if (isFullScreen.value) {
        cfs.call(document);
        isFullScreen.value = false;
    } else {
        rfs.call(html);
        isFullScreen.value = true;
    }
};
