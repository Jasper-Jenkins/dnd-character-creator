import React from 'react'
import defaultImage from './assets/images/defaultImage3x4.png'

const CharacterImage = (props) => {

    const raceSelected = props.raceSelected
    const classSelected = props.classSelected

    const pickImage = (selection, index) => {
        for (var i = 0; i < selection.length; i++) {
            if (index === selection[i].index) {
                if (selection[i].url.length < 1) { //needs validation for image urls that are broken
                    return (<img src={defaultImage} className='characterImage' alt={selection[i].index} />);
                }
                return (<img src={selection[i].url} className='characterImage' alt={selection[i].index} />);
            }
        }
    }

    switch (raceSelected.index) {
        case 'human':
            if (classSelected.index !== undefined) {
                const images = [
                    { index: 'barbarian', url: 'https://i.pinimg.com/564x/a4/58/88/a458888a16d0643b81f9f9421f80dd5b.jpg', author: '', contact: '', },
                    { index: 'bard', url: 'https://i.pinimg.com/564x/b3/07/90/b30790fbb186269e1e935bc7723c42d4.jpg', author: '', contact: '', },
                    { index: 'cleric', url: 'https://i.pinimg.com/564x/1a/3b/78/1a3b784f009047d3213235de843607ae.jpg', author: '', contact: '', },
                    { index: 'druid', url: 'https://i.pinimg.com/564x/72/7b/e5/727be5cd3cab5399fdec593d6331cd6c.jpg', author: '', contact: '', },
                    { index: 'fighter', url: 'https://i.pinimg.com/564x/24/cf/fc/24cffc7132c9a450490e9ac1c87468d4.jpg', author: '', contact: '', },
                    { index: 'monk', url: 'https://i.pinimg.com/564x/8c/37/71/8c3771cd013384aa23f5730720899c9a.jpg', author: '', contact: '', },
                    { index: 'paladin', url: 'https://i.pinimg.com/564x/45/24/72/4524723510cd2602015af0c304bc9a4e.jpg', author: '', contact: '', },
                    { index: 'ranger', url: 'https://i.pinimg.com/564x/81/68/05/816805148150db62e71a576111996331.jpg', author: '', contact: '', },
                    { index: 'rogue', url: 'https://i.pinimg.com/564x/83/45/38/834538b196724b0c00f8e5b232105737.jpg', author: '', contact: '', },
                    { index: 'sorcerer', url: 'https://i.pinimg.com/564x/a0/73/ee/a073ee9630a21db6bb789c4bf60ee4a1.jpg', author: '', contact: '', },
                    { index: 'warlock', url: 'https://i.pinimg.com/564x/58/c0/a6/58c0a66f043e574167d6ad8846b0764f.jpg', author: '', contact: '', },
                    { index: 'wizard', url: 'https://i.pinimg.com/564x/a8/7c/af/a87caf005ff8e694317734fb00bc9b49.jpg', author: '', contact: '', },
                ]
                return pickImage(images, classSelected.index);
            } else {
                return (<img src='https://i.pinimg.com/564x/1a/b0/0b/1ab00b7f21a506b04ae305ebfed5023b.jpg' className='characterImage' alt='default' />);
            }
        case 'half-orc':
            if (classSelected.index !== undefined) {
                const images = [
                    { index: 'barbarian', url: 'https://i.pinimg.com/564x/65/5b/66/655b66eaccf07c85075cc9ee7a6b7621.jpg', author: '', contact: '', },
                    { index: 'bard', url: 'https://i.pinimg.com/564x/a2/dd/43/a2dd43c8acc92d3a8817a5ebbf5de84c.jpg', author: '', contact: '', },
                    { index: 'cleric', url: 'https://i.pinimg.com/564x/82/2f/37/822f37b3daefae660a986acf09719429.jpg', author: '', contact: '', },
                    { index: 'druid', url: 'https://i.pinimg.com/564x/9f/ac/9b/9fac9b6b2363d623a34b843bf71db308.jpg', author: '', contact: '', },
                    { index: 'fighter', url: 'https://i.pinimg.com/564x/6a/69/f4/6a69f4c99dbedf0ffced9e60f59cf066.jpg', author: '', contact: '', },
                    { index: 'monk', url: 'https://i.pinimg.com/564x/6b/5e/05/6b5e05a09cfc1d5047eb1add818dacc2.jpg', author: '', contact: '', },
                    { index: 'paladin', url: 'https://i.pinimg.com/564x/31/d2/d0/31d2d04bf80c5080a0d04baedc3774e5.jpg', author: '', contact: '', },
                    { index: 'ranger', url: 'https://i.pinimg.com/564x/93/9f/94/939f9487fd63b7afae454b2ea84c85bd.jpg', author: '', contact: '', },
                    { index: 'rogue', url: 'https://i.pinimg.com/564x/a0/28/47/a028471d7d1b5b864027363e6a128ef2.jpg', author: '', contact: '', },
                    { index: 'sorcerer', url: 'https://i.pinimg.com/564x/e4/80/0b/e4800b3b957992b85c1d663456d1b65a.jpg', author: '', contact: '', },
                    { index: 'warlock', url: 'https://i.pinimg.com/564x/e8/aa/82/e8aa821de4be602c6bfc776da87ca1e8.jpg', author: '', contact: '', },
                    { index: 'wizard', url: 'https://i.pinimg.com/564x/75/ef/b4/75efb4e3685efb77effcc40c710a7403.jpg', author: '', contact: '', },
                ]
                return (pickImage(images, classSelected.index));
            } else {
                return (<img src='https://i.pinimg.com/564x/b5/62/82/b562828218dec5916a898c2ab29c5922.jpg' className='characterImage' alt='default' />);
            }
        case 'elf':
            if (classSelected.index !== undefined) {
                const images = [
                    { index: 'barbarian', url: '', author: '', contact: '', },
                    { index: 'bard', url: '', author: '', contact: '', },
                    { index: 'cleric', url: '', author: '', contact: '', },
                    { index: 'druid', url: '', author: '', contact: '', },
                    { index: 'fighter', url: '', author: '', contact: '', },
                    { index: 'monk', url: '', author: '', contact: '', },
                    { index: 'paladin', url: '', author: '', contact: '', },
                    { index: 'ranger', url: '', author: '', contact: '', },
                    { index: 'rogue', url: '', author: '', contact: '', },
                    { index: 'sorcerer', url: '', author: '', contact: '', },
                    { index: 'warlock', url: '', author: '', contact: '', },
                    { index: 'wizard', url: '', author: '', contact: '', },
                ]
                return pickImage(images, classSelected.index)
            } else {
                return (<img src={defaultImage} className='characterImage' alt='default' />);
            }
        case 'half-elf':
            if (classSelected.index !== undefined) {
                const images = [
                    { index: 'barbarian', url: '', author: '', contact: '', },
                    { index: 'bard', url: '', author: '', contact: '', },
                    { index: 'cleric', url: '', author: '', contact: '', },
                    { index: 'druid', url: '', author: '', contact: '', },
                    { index: 'fighter', url: '', author: '', contact: '', },
                    { index: 'monk', url: '', author: '', contact: '', },
                    { index: 'paladin', url: '', author: '', contact: '', },
                    { index: 'ranger', url: '', author: '', contact: '', },
                    { index: 'rogue', url: '', author: '', contact: '', },
                    { index: 'sorcerer', url: '', author: '', contact: '', },
                    { index: 'warlock', url: '', author: '', contact: '', },
                    { index: 'wizard', url: '', author: '', contact: '', },
                ]
                return pickImage(images, classSelected.index)
            } else {
                return (<img src={defaultImage} className='characterImage' alt='default' />);
            }
        case 'halfling':
            if (classSelected.index !== undefined) {
                const images = [
                    { index: 'barbarian', url: '', author: '', contact: '', },
                    { index: 'bard', url: '', author: '', contact: '', },
                    { index: 'cleric', url: '', author: '', contact: '', },
                    { index: 'druid', url: '', author: '', contact: '', },
                    { index: 'fighter', url: '', author: '', contact: '', },
                    { index: 'monk', url: '', author: '', contact: '', },
                    { index: 'paladin', url: '', author: '', contact: '', },
                    { index: 'ranger', url: '', author: '', contact: '', },
                    { index: 'rogue', url: '', author: '', contact: '', },
                    { index: 'sorcerer', url: '', author: '', contact: '', },
                    { index: 'warlock', url: '', author: '', contact: '', },
                    { index: 'wizard', url: '', author: '', contact: '', },
                ]
                return pickImage(images, classSelected.index)
            } else {
                return (<img src={defaultImage} className='characterImage' alt='default' />);
            }
        case 'tiefling':
            if (classSelected.index !== undefined) {
                const images = [
                    { index: 'barbarian', url: '', author: '', contact: '', },
                    { index: 'bard', url: '', author: '', contact: '', },
                    { index: 'cleric', url: '', author: '', contact: '', },
                    { index: 'druid', url: '', author: '', contact: '', },
                    { index: 'fighter', url: '', author: '', contact: '', },
                    { index: 'monk', url: '', author: '', contact: '', },
                    { index: 'paladin', url: '', author: '', contact: '', },
                    { index: 'ranger', url: '', author: '', contact: '', },
                    { index: 'rogue', url: '', author: '', contact: '', },
                    { index: 'sorcerer', url: '', author: '', contact: '', },
                    { index: 'warlock', url: '', author: '', contact: '', },
                    { index: 'wizard', url: '', author: '', contact: '', },
                ]
                return pickImage(images, classSelected.index)
            } else {
                return (<img src={defaultImage} className='characterImage' alt='default' />);
            }
        case 'dragonborn':
            if (classSelected.index !== undefined) {
                const images = [
                    { index: 'barbarian', url: '', author: '', contact: '', },
                    { index: 'bard', url: '', author: '', contact: '', },
                    { index: 'cleric', url: '', author: '', contact: '', },
                    { index: 'druid', url: '', author: '', contact: '', },
                    { index: 'fighter', url: '', author: '', contact: '', },
                    { index: 'monk', url: '', author: '', contact: '', },
                    { index: 'paladin', url: '', author: '', contact: '', },
                    { index: 'ranger', url: '', author: '', contact: '', },
                    { index: 'rogue', url: '', author: '', contact: '', },
                    { index: 'sorcerer', url: '', author: '', contact: '', },
                    { index: 'warlock', url: '', author: '', contact: '', },
                    { index: 'wizard', url: '', author: '', contact: '', },
                ]
                return pickImage(images, classSelected.index)
            } else {
                return (<img src={defaultImage} className='characterImage' alt='default' />);
            }
        case 'gnome':
            if (classSelected.index !== undefined) {
                const images = [
                    { index: 'barbarian', url: '', author: '', contact: '', },
                    { index: 'bard', url: '', author: '', contact: '', },
                    { index: 'cleric', url: '', author: '', contact: '', },
                    { index: 'druid', url: '', author: '', contact: '', },
                    { index: 'fighter', url: '', author: '', contact: '', },
                    { index: 'monk', url: '', author: '', contact: '', },
                    { index: 'paladin', url: '', author: '', contact: '', },
                    { index: 'ranger', url: '', author: '', contact: '', },
                    { index: 'rogue', url: '', author: '', contact: '', },
                    { index: 'sorcerer', url: '', author: '', contact: '', },
                    { index: 'warlock', url: '', author: '', contact: '', },
                    { index: 'wizard', url: '', author: '', contact: '', },
                ]
                return pickImage(images, classSelected.index)
            } else {
                return (<img src={defaultImage} className='characterImage' alt='default' />);
            }
        case 'dwarf':
            if (classSelected.index !== undefined) {
                const images = [
                    { index: 'barbarian', url: '', author: '', contact: '', },
                    { index: 'bard', url: '', author: '', contact: '', },
                    { index: 'cleric', url: '', author: '', contact: '', },
                    { index: 'druid', url: '', author: '', contact: '', },
                    { index: 'fighter', url: '', author: '', contact: '', },
                    { index: 'monk', url: '', author: '', contact: '', },
                    { index: 'paladin', url: '', author: '', contact: '', },
                    { index: 'ranger', url: '', author: '', contact: '', },
                    { index: 'rogue', url: '', author: '', contact: '', },
                    { index: 'sorcerer', url: '', author: '', contact: '', },
                    { index: 'warlock', url: '', author: '', contact: '', },
                    { index: 'wizard', url: '', author: '', contact: '', },
                ]
                return pickImage(images, classSelected.index)
            } else {
                return (<img src={defaultImage} className='characterImage' alt='default' />);
            }
        default:
            return (<img src={defaultImage} className='characterImage' alt='default' />);
    }
} 

const CharacterImages = {
    elf: [{ index: 'barbarian', url: '', author: '', contact: '', },
            { index: 'bard', url: '', author: '', contact: '', },
            { index: 'cleric', url: '', author: '', contact: '', },
            { index: 'druid', url: '', author: '', contact: '', },
            { index: 'fighter', url: '', author: '', contact: '', },
            { index: 'monk', url: '', author: '', contact: '', },
            { index: 'paladin', url: '', author: '', contact: '', },
            { index: 'ranger', url: '', author: '', contact: '', },
            { index: 'rogue', url: '', author: '', contact: '', },
            { index: 'sorcerer', url: '', author: '', contact: '', },
            { index: 'warlock', url: '', author: '', contact: '', },
            { index: 'wizard', url: '', author: '', contact: '', },],
    human: [
        { index: 'barbarian', url: 'https://i.pinimg.com/564x/a4/58/88/a458888a16d0643b81f9f9421f80dd5b.jpg', author: '', contact: '', },
        { index: 'bard', url: 'https://i.pinimg.com/564x/b3/07/90/b30790fbb186269e1e935bc7723c42d4.jpg', author: '', contact: '', },
        { index: 'cleric', url: 'https://i.pinimg.com/564x/1a/3b/78/1a3b784f009047d3213235de843607ae.jpg', author: '', contact: '', },
        { index: 'druid', url: 'https://i.pinimg.com/564x/72/7b/e5/727be5cd3cab5399fdec593d6331cd6c.jpg', author: '', contact: '', },
        { index: 'fighter', url: 'https://i.pinimg.com/564x/24/cf/fc/24cffc7132c9a450490e9ac1c87468d4.jpg', author: '', contact: '', },
        { index: 'monk', url: 'https://i.pinimg.com/564x/8c/37/71/8c3771cd013384aa23f5730720899c9a.jpg', author: '', contact: '', },
        { index: 'paladin', url: 'https://i.pinimg.com/564x/45/24/72/4524723510cd2602015af0c304bc9a4e.jpg', author: '', contact: '', },
        { index: 'ranger', url: 'https://i.pinimg.com/564x/81/68/05/816805148150db62e71a576111996331.jpg', author: '', contact: '', },
        { index: 'rogue', url: 'https://i.pinimg.com/564x/83/45/38/834538b196724b0c00f8e5b232105737.jpg', author: '', contact: '', },
        { index: 'sorcerer', url: 'https://i.pinimg.com/564x/a0/73/ee/a073ee9630a21db6bb789c4bf60ee4a1.jpg', author: '', contact: '', },
        { index: 'warlock', url: 'https://i.pinimg.com/564x/58/c0/a6/58c0a66f043e574167d6ad8846b0764f.jpg', author: '', contact: '', },
        { index: 'wizard', url: 'https://i.pinimg.com/564x/a8/7c/af/a87caf005ff8e694317734fb00bc9b49.jpg', author: '', contact: '', },
    ],
    dwarf: [{ index: 'barbarian', url: '', author: '', contact: '', },
            { index: 'bard', url: '', author: '', contact: '', },
            { index: 'cleric', url: '', author: '', contact: '', },
            { index: 'druid', url: '', author: '', contact: '', },
            { index: 'fighter', url: '', author: '', contact: '', },
            { index: 'monk', url: '', author: '', contact: '', },
            { index: 'paladin', url: '', author: '', contact: '', },
            { index: 'ranger', url: '', author: '', contact: '', },
            { index: 'rogue', url: '', author: '', contact: '', },
            { index: 'sorcerer', url: '', author: '', contact: '', },
            { index: 'warlock', url: '', author: '', contact: '', },
            { index: 'wizard', url: '', author: '', contact: '', },],
    halfelf: [{ index: 'barbarian', url: '', author: '', contact: '', },
                { index: 'bard', url: '', author: '', contact: '', },
                { index: 'cleric', url: '', author: '', contact: '', },
                { index: 'druid', url: '', author: '', contact: '', },
                { index: 'fighter', url: '', author: '', contact: '', },
                { index: 'monk', url: '', author: '', contact: '', },
                { index: 'paladin', url: '', author: '', contact: '', },
                { index: 'ranger', url: '', author: '', contact: '', },
                { index: 'rogue', url: '', author: '', contact: '', },
                { index: 'sorcerer', url: '', author: '', contact: '', },
                { index: 'warlock', url: '', author: '', contact: '', },
                { index: 'wizard', url: '', author: '', contact: '', },],
    halfling: [{ index: 'barbarian', url: '', author: '', contact: '', },
                { index: 'bard', url: '', author: '', contact: '', },
                { index: 'cleric', url: '', author: '', contact: '', },
                { index: 'druid', url: '', author: '', contact: '', },
                { index: 'fighter', url: '', author: '', contact: '', },
                { index: 'monk', url: '', author: '', contact: '', },
                { index: 'paladin', url: '', author: '', contact: '', },
                { index: 'ranger', url: '', author: '', contact: '', },
                { index: 'rogue', url: '', author: '', contact: '', },
                { index: 'sorcerer', url: '', author: '', contact: '', },
                { index: 'warlock', url: '', author: '', contact: '', },
                { index: 'wizard', url: '', author: '', contact: '', },],
    tiefling: [{ index: 'barbarian', url: '', author: '', contact: '', },
                { index: 'bard', url: '', author: '', contact: '', },
                { index: 'cleric', url: '', author: '', contact: '', },
                { index: 'druid', url: '', author: '', contact: '', },
                { index: 'fighter', url: '', author: '', contact: '', },
                { index: 'monk', url: '', author: '', contact: '', },
                { index: 'paladin', url: '', author: '', contact: '', },
                { index: 'ranger', url: '', author: '', contact: '', },
                { index: 'rogue', url: '', author: '', contact: '', },
                { index: 'sorcerer', url: '', author: '', contact: '', },
                { index: 'warlock', url: '', author: '', contact: '', },
                { index: 'wizard', url: '', author: '', contact: '', },],
    halforc: [
        { index: 'barbarian', url: 'https://i.pinimg.com/564x/65/5b/66/655b66eaccf07c85075cc9ee7a6b7621.jpg', author: '', contact: '', },
        { index: 'bard', url: 'https://i.pinimg.com/564x/a2/dd/43/a2dd43c8acc92d3a8817a5ebbf5de84c.jpg', author: '', contact: '', },
        { index: 'cleric', url: 'https://i.pinimg.com/564x/82/2f/37/822f37b3daefae660a986acf09719429.jpg', author: '', contact: '', },
        { index: 'druid', url: 'https://i.pinimg.com/564x/9f/ac/9b/9fac9b6b2363d623a34b843bf71db308.jpg', author: '', contact: '', },
        { index: 'fighter', url: 'https://i.pinimg.com/564x/6a/69/f4/6a69f4c99dbedf0ffced9e60f59cf066.jpg', author: '', contact: '', },
        { index: 'monk', url: 'https://i.pinimg.com/564x/6b/5e/05/6b5e05a09cfc1d5047eb1add818dacc2.jpg', author: '', contact: '', },
        { index: 'paladin', url: 'https://i.pinimg.com/564x/31/d2/d0/31d2d04bf80c5080a0d04baedc3774e5.jpg', author: '', contact: '', },
        { index: 'ranger', url: 'https://i.pinimg.com/564x/93/9f/94/939f9487fd63b7afae454b2ea84c85bd.jpg', author: '', contact: '', },
        { index: 'rogue', url: 'https://i.pinimg.com/564x/a0/28/47/a028471d7d1b5b864027363e6a128ef2.jpg', author: '', contact: '', },
        { index: 'sorcerer', url: 'https://i.pinimg.com/564x/e4/80/0b/e4800b3b957992b85c1d663456d1b65a.jpg', author: '', contact: '', },
        { index: 'warlock', url: 'https://i.pinimg.com/564x/e8/aa/82/e8aa821de4be602c6bfc776da87ca1e8.jpg', author: '', contact: '', },
        { index: 'wizard', url: 'https://i.pinimg.com/564x/75/ef/b4/75efb4e3685efb77effcc40c710a7403.jpg', author: '', contact: '', },
    ],
    dragonborn: [{ index: 'barbarian', url: '', author: '', contact: '', },
                { index: 'bard', url: '', author: '', contact: '', },
                { index: 'cleric', url: '', author: '', contact: '', },
                { index: 'druid', url: '', author: '', contact: '', },
                { index: 'fighter', url: '', author: '', contact: '', },
                { index: 'monk', url: '', author: '', contact: '', },
                { index: 'paladin', url: '', author: '', contact: '', },
                { index: 'ranger', url: '', author: '', contact: '', },
                { index: 'rogue', url: '', author: '', contact: '', },
                { index: 'sorcerer', url: '', author: '', contact: '', },
                { index: 'warlock', url: '', author: '', contact: '', },
                { index: 'wizard', url: '', author: '', contact: '', },],
    gnome: [{ index: 'barbarian', url: '', author: '', contact: '', },
            { index: 'bard', url: '', author: '', contact: '', },
            { index: 'cleric', url: '', author: '', contact: '', },
            { index: 'druid', url: '', author: '', contact: '', },
            { index: 'fighter', url: '', author: '', contact: '', },
            { index: 'monk', url: '', author: '', contact: '', },
            { index: 'paladin', url: '', author: '', contact: '', },
            { index: 'ranger', url: '', author: '', contact: '', },
            { index: 'rogue', url: '', author: '', contact: '', },
            { index: 'sorcerer', url: '', author: '', contact: '', },
            { index: 'warlock', url: '', author: '', contact: '', },
            { index: 'wizard', url: '', author: '', contact: '', },],
}



export default CharacterImage