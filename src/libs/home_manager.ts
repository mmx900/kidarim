const HOME_KEY = "home"

export function addToHome() {

}

export function removeFromHome() {

}

export function getHomeList() {
    const item = localStorage.getItem(HOME_KEY);
    let list: any[] = [];

    if (item) {
        JSON.parse(item);
    } else {
        //localStorage.setItem(HOME_KEY, JSON.stringify([]))
    }

    return list;
}
