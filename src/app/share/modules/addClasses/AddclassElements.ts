const AddRemoveClassList = (ElementsHTML: Element, ClassAdd: string) => {

    document.querySelector(`.${ClassAdd}`)?.classList.remove(`${ClassAdd}`);

    ElementsHTML.classList.add(`${ClassAdd}`);
}



export const AddclassElements = (ElementsHTML: string, ClassAdd: string) => {

    try {
        const Elements = document.querySelectorAll(`.${ElementsHTML}`);

        if (Elements == undefined) throw new Error('Elemento Não Encontrado!!');

        Elements.forEach((element) => {
            element.addEventListener('click', () => {

                AddRemoveClassList(element, ClassAdd);

            })
        })

    } catch (e: unknown) {
        const Err = (e as TypeError).message

        console.log(Err)

    }
}



export const ReloadPageAddclassElements = (ElementsHTML: string, ClassAdd: string) => {
    try {

        const urlPosition = window.location.hash.split('/')[1];
        let index: number;

        switch (urlPosition) {
            case 'car':
                index = 1;
                break;

            case 'user':
                index = 2;
                break;

            default:
                index = 0;
                break;
        }

        const elements = document.querySelectorAll(`.${ElementsHTML}`);

        if (elements == undefined) throw new Error('Elemento Não Encontrado!!');

        AddRemoveClassList(elements[index], ClassAdd);

    } catch (e: unknown) {
        const Err = (e as TypeError).message

        console.log(Err)

    }
}

export const addClassFavorite = (id: number, remove: boolean) => {

    try {
        const ProductsFavoretes = document.querySelectorAll(`.ProductId${id}`);

        if (ProductsFavoretes == undefined || ProductsFavoretes == null) throw new Error('Elementos não encontrados!!');

        
        for (const item of ProductsFavoretes) {

            if (remove == false) item.classList.add('product-favorite');
            else item.classList.toggle('product-favorite');
        }
    } catch (e: unknown) {
        const Err = (e as TypeError).message

        console.log(Err)

    }

    return;
}


export const AddClassCarNoempty = (carProductNumber: number) => {
    try {
        const TagCar = document.getElementById('producCarCount');

        TagCar?.classList.remove('producCarCount');

        if (carProductNumber != 0) {
            TagCar?.classList.add('producCarCount');
        }

    } catch (e: unknown) {
        const Err = (e as TypeError).message

        console.log(Err)

    }
}

export const addAnimationClass = (elementClassId: string, animationClass: string, timeRemoveClass: number) => {

    try {
        const element = document.querySelector(elementClassId);
        const element_animation = document.querySelector(`.${animationClass}`)

        if (!element) throw new Error('Elemento não encontrado!!');

        if (element_animation) element_animation.classList.remove(animationClass)

        element.classList.add(animationClass)

        setTimeout(() => {

            element.classList.remove(animationClass);

        }, timeRemoveClass)


    } catch (e: unknown) {
        const Err = (e as TypeError).message

        console.log(Err)

    }

}

export const ToggleClass = (element: string, toggleClass: string) => {
    const elementToggleClass = document.querySelector(element);

    elementToggleClass?.classList.toggle(toggleClass);
}

export const hiddeContainerEmpty = (idClassElement: string, classHidde: string, stateWatch: number[]) => {

    const favoriteRenderContainer = document.querySelector(idClassElement);
    if (stateWatch.length == 0) {

        favoriteRenderContainer?.classList.add(classHidde);

    } else if (favoriteRenderContainer?.classList.contains(classHidde)) {

        favoriteRenderContainer?.classList.remove(classHidde);
    }

}
