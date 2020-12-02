const cards = [
    ['Action', 'Nature', 'Pets', 'Wild animals', 'Clothes', 'Emotions', 'Colors', 'Food'],
    ['action.jpg', 'nature.jpg', 'pets.jpg', 'animal.jpg', 'clothes.jpg', 'emotions.jpg', 'colors.jpg', 'food1.jpg'],
    [{
            word: 'cry',
            translation: 'плакать',
            image: 'img/act_cry.jpg',
            audioSrc: 'audio/cry.mp3'
        },
        {
            word: 'dance',
            translation: 'танцевать',
            image: 'img/act_dance.jpg',
            audioSrc: 'audio/dance.mp3'
        },
        {
            word: 'dive',
            translation: 'нырять',
            image: 'img/act_dive.jpg',
            audioSrc: 'audio/dive.mp3'
        },
        {
            word: 'run',
            translation: 'бежать',
            image: 'img/act_run.jpg',
            audioSrc: 'audio/run.mp3'
        },
        {
            word: 'read',
            translation: 'читать',
            image: 'img/act_read.jpg',
            audioSrc: 'audio/read.mp3'
        },
        {
            word: 'fly',
            translation: 'летать',
            image: 'img/fly.jpg',
            audioSrc: 'audio/fly.mp3'
        },
        {
            word: 'hug',
            translation: 'обнимать',
            image: 'img/hug.jpg',
            audioSrc: 'audio/hug.mp3'
        },
        {
            word: 'jump',
            translation: 'прыгать',
            image: 'img/act_jump.jpg',
            audioSrc: 'audio/jump.mp3'
        }
    ],
    [{
            word: 'grass',
            translation: 'трава',
            image: 'img/nat_grass.jpg',
            audioSrc: 'audio/grass.mp3'
        },
        {
            word: 'tree',
            translation: 'дерево',
            image: 'img/nat_tree.jpg',
            audioSrc: 'audio/tree.mp3'
        },
        {
            word: 'rainbow',
            translation: 'радуга',
            image: 'img/nat_rainbow.jpg',
            audioSrc: 'audio/rainbow.mp3'
        },
        {
            word: 'pond',
            translation: 'пруд',
            image: 'img/nat_pond.jpg',
            audioSrc: 'audio/pond.mp3'
        },
        {
            word: 'leaf',
            translation: 'листик',
            image: 'img/nat_leaf.jpg',
            audioSrc: 'audio/leaf.mp3'
        },
        {
            word: 'flower',
            translation: 'цветок',
            image: 'img/nat_flower.jpg',
            audioSrc: 'audio/flower.mp3'
        },
        {
            word: 'sun',
            translation: 'солнце',
            image: 'img/nat_sun.jpg',
            audioSrc: 'audio/sun.mp3'
        },
        {
            word: 'island',
            translation: 'остров',
            image: 'img/nat_island.jpg',
            audioSrc: 'audio/island.mp3'
        }
    ],
    [{
            word: 'cat',
            translation: 'кот',
            image: 'img/an_cat.jpg',
            audioSrc: 'audio/cat.mp3'
        },
        {
            word: 'chick',
            translation: 'цыплёнок',
            image: 'img/an_chick.jpg',
            audioSrc: 'audio/chick.mp3'
        },
        {
            word: 'chicken',
            translation: 'курица',
            image: 'img/an_chicken.jpg',
            audioSrc: 'audio/chicken.mp3'
        },
        {
            word: 'dog',
            translation: 'собака',
            image: 'img/an_dog.jpg',
            audioSrc: 'audio/dog.mp3'
        },
        {
            word: 'horse',
            translation: 'лошадь',
            image: 'img/an_horse.jpg',
            audioSrc: 'audio/horse.mp3'
        },
        {
            word: 'pig',
            translation: 'свинья',
            image: 'img/an_pig.jpg',
            audioSrc: 'audio/pig.mp3'
        },
        {
            word: 'rabbit',
            translation: 'кролик',
            image: 'img/an_rabbit.jpg',
            audioSrc: 'audio/rabbit.mp3'
        },
        {
            word: 'sheep',
            translation: 'овца',
            image: 'img/an_sheep.jpg',
            audioSrc: 'audio/sheep.mp3'
        }
    ],
    [{
            word: 'bear',
            translation: 'медведь',
            image: 'img/an_bear.jpg',
            audioSrc: 'audio/bear.mp3'
        },
        {
            word: 'lion',
            translation: 'лев',
            image: 'img/an_lion.jpg',
            audioSrc: 'audio/lion.mp3'
        },
        {
            word: 'elephant',
            translation: 'слон',
            image: 'img/an_elephant.jpg',
            audioSrc: 'audio/elephant.mp3'
        },
        {
            word: 'tiger',
            translation: 'тигр',
            image: 'img/an_tiger.jpg',
            audioSrc: 'audio/tiger.mp3'
        },
        {
            word: 'fox',
            translation: 'лиса',
            image: 'img/an_fox.jpg',
            audioSrc: 'audio/fox.mp3'
        },
        {
            word: 'raccoon',
            translation: 'енот',
            image: 'img/an_raccoon.jpg',
            audioSrc: 'audio/raccoon.mp3'
        },
        {
            word: 'deer',
            translation: 'олень',
            image: 'img/an_deer.jpg',
            audioSrc: 'audio/deer.mp3'
        },
        {
            word: 'hippo',
            translation: 'бегемот',
            image: 'img/an_hippo.jpg',
            audioSrc: 'audio/hippo.mp3'
        }
    ],
    [{
            word: 'skirt',
            translation: 'юбка',
            image: 'img/cl_scirt.jpg',
            audioSrc: 'audio/skirt.mp3'
        },
        {
            word: 'pants',
            translation: 'брюки',
            image: 'img/cl_pants.jpg',
            audioSrc: 'audio/pants.mp3'
        },
        {
            word: 'blouse',
            translation: 'блузка',
            image: 'img/cl_blouse.jpg',
            audioSrc: 'audio/blouse.mp3'
        },
        {
            word: 'dress',
            translation: 'платье',
            image: 'img/cl_dress.jpg',
            audioSrc: 'audio/dress.mp3'
        },
        {
            word: 'boot',
            translation: 'ботинок',
            image: 'img/cl_boot.jpg',
            audioSrc: 'audio/boot.mp3'
        },
        {
            word: 'shirt',
            translation: 'рубашка',
            image: 'img/cl_shirt.jpg',
            audioSrc: 'audio/shirt.mp3'
        },
        {
            word: 'coat',
            translation: 'пальто',
            image: 'img/cl_coat.jpg',
            audioSrc: 'audio/coat.mp3'
        },
        {
            word: 'shoe',
            translation: 'туфли',
            image: 'img/cl_shoe.jpg',
            audioSrc: 'audio/shoe.mp3'
        }
    ],
    [{
            word: 'sad',
            translation: 'грустный',
            image: 'img/em_sad.jpg',
            audioSrc: 'audio/sad.mp3'
        },
        {
            word: 'angry',
            translation: 'сердитый',
            image: 'img/em_angry.jpg',
            audioSrc: 'audio/angry.mp3'
        },
        {
            word: 'confused',
            translation: 'смущенный',
            image: 'img/em_confused.jpg',
            audioSrc: 'audio/confused.mp3'
        },
        {
            word: 'annoyanced',
            translation: 'раздраженный',
            image: 'img/em_annoyanced.jpg',
            audioSrc: 'audio/annoyanced.mp3'
        },
        {
            word: 'surprised',
            translation: 'удивлённый',
            image: 'img/em_surprised.jpg',
            audioSrc: 'audio/surprised.mp3'
        },
        {
            word: 'glad',
            translation: 'довольный',
            image: 'img/em_glad.jpg',
            audioSrc: 'audio/glad.mp3'
        },
        {
            word: 'abashed',
            translation: 'смущенный',
            image: 'img/em_abashed.jpg',
            audioSrc: 'audio/abashed.mp3'
        },
        {
            word: 'laugh',
            translation: 'смех',
            image: 'img/em_laugh.jpg',
            audioSrc: 'audio/laugh.mp3'
        }
    ],
    [{
            word: 'yellow',
            translation: 'желтый',
            image: 'img/col_yellow.jpg',
            audioSrc: 'audio/yellow.mp3'
        },
        {
            word: 'red',
            translation: 'красный',
            image: 'img/col_red.jpg',
            audioSrc: 'audio/red.mp3'
        },
        {
            word: 'green',
            translation: 'зеленый',
            image: 'img/col_green.jpg',
            audioSrc: 'audio/green.mp3'
        },
        {
            word: 'blue',
            translation: 'синий',
            image: 'img/col_blue.jpg',
            audioSrc: 'audio/blue.mp3'
        },
        {
            word: 'gold',
            translation: 'золотой',
            image: 'img/col_gold.jpg',
            audioSrc: 'audio/gold.mp3'
        },
        {
            word: 'grey',
            translation: 'серый',
            image: 'img/col_grey.jpg',
            audioSrc: 'audio/grey.mp3'
        },
        {
            word: 'pink',
            translation: 'розовый',
            image: 'img/col_pink.jpg',
            audioSrc: 'audio/pink.mp3'
        },
        {
            word: 'orange',
            translation: 'оранжевый',
            image: 'img/col_orange.jpg',
            audioSrc: 'audio/orange.mp3'
        }
    ],
    [{
            word: 'banana',
            translation: 'банан',
            image: 'img/f_banana.jpg',
            audioSrc: 'audio/banana.mp3'
        },
        {
            word: 'bread',
            translation: 'хлеб',
            image: 'img/f_bread.jpg',
            audioSrc: 'audio/bread.mp3'
        },
        {
            word: 'cheese',
            translation: 'сыр',
            image: 'img/f_cheese.jpg',
            audioSrc: 'audio/cheese.mp3'
        },
        {
            word: 'egg',
            translation: 'яйцо',
            image: 'img/f_egg.jpg',
            audioSrc: 'audio/egg.mp3'
        },
        {
            word: 'jam',
            translation: 'варенье',
            image: 'img/f_jam.jpg',
            audioSrc: 'audio/jam.mp3'
        },
        {
            word: 'milk',
            translation: 'молоко',
            image: 'img/f_milk.jpg',
            audioSrc: 'audio/milk.mp3'
        },
        {
            word: 'tomato',
            translation: 'помидор',
            image: 'img/f_tomato.jpg',
            audioSrc: 'audio/tomato.mp3'
        },
        {
            word: 'water',
            translation: 'вода',
            image: 'img/f_water.jpg',
            audioSrc: 'audio/water.mp3'
        }
    ]
];

export default cards;