import React from 'react'


const CharacterImage = (props) => {
    console.log("Image props", props)

    const raceSelected = props.raceSelected
    const classSelected = props.classSelected
    const classesInfo = props.classesInfo

    console.log("races Selected for images ", raceSelected, "class selected for iamges ", classSelected)
    
        switch (raceSelected.index) {
            case 'human':
                if (classSelected.index !== undefined) {
                    console.log('human images coming up for ', classSelected.name)
                    const imagesForClassSelectionAsHuman = [
                        { index: 'barbarian', url: 'https://i.pinimg.com/564x/db/c8/7c/dbc87c7ceb36d62190d3d90f9d4dafc2.jpg', author: '', contact: '', },
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
                    for (var i = 0; i < classesInfo.length; i++) {
                        if (classSelected.index === imagesForClassSelectionAsHuman[i].index) {
                            return (<img src={imagesForClassSelectionAsHuman[i].url} className='classSelectImage' alt={imagesForClassSelectionAsHuman[i].index} />);
                        }
                    }
                } else {
                    console.log('say whaaaaaaaa')
                    return (<img src='https://i.pinimg.com/564x/1a/b0/0b/1ab00b7f21a506b04ae305ebfed5023b.jpg' className='classSelectImage' alt='default' />);
                }
                break;
            case 'half-orc':
                return null;
            case 'elf':
                return null;
            case 'half-elf':
                return null;
            case 'halfling':
                return null;
            case 'tiefling':
                return null;
            case 'dragonborn':
                return null;
            case 'gnome':
                return null;
            case 'dwarf':
                return null;
            default:
                return (<img src='https://i.pinimg.com/564x/1a/b0/0b/1ab00b7f21a506b04ae305ebfed5023b.jpg' className='classSelectImage' alt='default' />);

        }
} 

export default CharacterImage