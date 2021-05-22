        //sempre que o hash muda ele chama essa função
        window.onhashchange = function(e){
            const oldUrl = e.oldUrl.split('#')[1]
            const newUrl = e.newUrl.split('#')[1]
            console.log(oldUrl, newUrl)
            const oldMenu = document.querySelector(`.menu a[href='#${oldUrl}']`)
            const newMenu = document.querySelector(`.menu a[href='#${newUrl}']`)
            oldMenu && oldMenu.classList.remove('selected')
            newMenu && newMenu.classList.add('selected')
            

        }