let isScrolling;
const heightFromTheBottom = "0px";
const opacityMax = "1";
const opacityMin = "0";
const defaultTransitionTiming = "0.1";
const intervalBeforeBarAppearAfterFirstVisit = "5000";
const cookieDaysExpiration = 30;


const afterLoadPageShowVinhoodBanner = () => {
    const element = document.getElementById('navigationBar');
    let alreadyVisitPage = getCookie('vinhoodAlreadVisitPage');
    if (alreadyVisitPage) {
        setInterval(function () {
            changeOpacity(element, opacityMax, defaultTransitionTiming);
        }, intervalBeforeBarAppearAfterFirstVisit);
    } else {
        changeOpacity(element, opacityMax, defaultTransitionTiming);
        createCookie('vinhoodAlreadVisitPage', true, cookieDaysExpiration);
    }
    element.style.bottom = heightFromTheBottom;

};

const manageScrollingActionForVinhoodBanner = () => {

    var element = document.getElementById('navigationBar');
    changeOpacity(element, opacityMin, defaultTransitionTiming);
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function () {
        changeOpacity(element, opacityMax, defaultTransitionTiming);
    }, 66);
};


const changeOpacity = (element, opacity, timing) => {
    element.style.opacity = opacity;
    element.style.transition = "opacity " + timing + "s";
    const ieOpacity = opacity * 100;
    element.style.filter = 'alpha(opacity=' + ieOpacity + ')'; // IE fallback
}

const createCookie = (name, value, days) => {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

const getCookie = (c_name) => {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

window.addEventListener("DOMContentLoaded", afterLoadPageShowVinhoodBanner);
window.addEventListener('scroll', manageScrollingActionForVinhoodBanner, false);