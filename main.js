let showUsers = async userList => {
    let wrapper = document.body.appendChild(document.createElement('div'))
    wrapper.classList.add('wrapper')

    for (let user of userList) {
        let cont = wrapper.appendChild(document.createElement('div'))
        let title = document.createElement('p')
        let img = document.createElement('img')


        let userAbout = () => {
            return new Promise((res, rej) => {
                img.onload = function (event) {
                    res(img)
                }
                img.onerror = function (event) {
                    rej()
                }
                img.src = user.avatar_url
                title.textContent = user.login
            })
        }

        let getRepo = () => {
            return fetch(user.repos_url)
                .then(response => response.json())
        }

        await Promise.all([userAbout(), getRepo()]) // => [val, val]
            .then(respArr => {
                console.log(respArr)
                cont.appendChild(respArr[0])
                cont.appendChild(title)
                for (var repo of respArr[1]) {
                    let repoLink = cont.appendChild(document.createElement('a'))
                    repoLink.href = repo.html_url
                    repoLink.textContent = repo.name
                }
            })
    }
}


let getGitHubUsers = () => {
    fetch('https://api.github.com/users?since=20000')
        .then(resp => resp.json())
        .then(users => showUsers(users))
}

getGitHubUsers()