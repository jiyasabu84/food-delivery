import { Restaurant, UserProfile, Order } from './types';

export const USER_PROFILE: UserProfile = {
  name: 'Jiya Sabu',
  email: 'jiyasabu98@gmail.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGG5Ri3F86Dij8-gWV-I5fjXyFV-oduvfd2kUPeFV8sFDAfcLrBs6c79Nb5BYBUG-1Ilc7-Qwa28aEhJQjlwz5ZraiOrMA5RXDCFdRT6KPHXQmc3oUTG3MdEUfqrzGBO1uhbTDmOfA_skFyi-ofbmYYJiHUZ_kH9TCoWJK5qSzIh2I9iOXQRPC4R3nsxt1yvCGXba0zA0XiuFhTEPTU8MYFdRkR71BakKzNuH3qQdwnscIilfgjHmGmz7fOyb0CgtffskKMpNb0QA',
  address: '248 Culinary Way, Orchard Grove, NY 10012',
  phone: '+1 (555) 732-9012',
};

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'green-kitchen',
    name: 'The Green Kitchen',
    description: 'Artisanal greens, seasonal bowls, and organic refreshments for the conscious eater.',
    rating: 4.8,
    time: '20-30 min',
    distance: '1.2 miles',
    cuisine: 'Healthy',
    categories: ['Salads', 'Healthy', 'Organic'],
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8oWr7M9_UiN9thkOEg4TcWWmc3wcbXqEd8clITNVjSpFvI5RWsH9AA3ygfY63QrYMkYNYFFCqqoicpUoyfTe-hcrGV_mF0D6Opng931uCmKs9ybUeCKS9ZKlKZUZKtcf46to6CWY4MWSa80EunshoSDSuUSFkd5maVvEWpEms7PHtnhf043i7YeLbw30GhgPJZ7ikeHTJnjHUclmoG__qG1Q_EQSoNghopg3cYdMw8PoswOYpBQeDwTanRp3uLmj_8tnoqUKg2lE',
    deliveryFee: 'Free',
    menu: [
      {
        id: 'harvest-salad',
        name: 'Harvest Salad',
        description: 'Kale, roasted sweet potato, pumpkin seeds, and tahini dressing.',
        price: 14.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEBrkOqhdWF1CBnKAz2M8KrmKnjPdR0g7lY1bYIoT8bQxRYLBJL7FPQe4D1MU5raUvaZEnc0OPL--WOtFixelqg83ZOwbLzLSBTAViaslSc0EgWgZOw35U99xl7Mp3A8-75uK-XUdwSIseXhAtNfBnOZZiRcuMabxDWXzEvw0uI_ZSzcUWXEJ9kB5hlfNIDwbXYR81ZAxeUzyAc_yi76JpPDOc9Ebx-uC4aYivlhkvR89_INt00m_CVagWHi5SgcWQVl4-vUAS82M',
        category: 'starters',
      },
      {
        id: 'miso-tofu-bowl',
        name: 'Miso Tofu Bowl',
        description: 'Organic tofu, edamame, cucumber, and ginger miso dressing over brown rice.',
        price: 14.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaF1nAxGYeh72v6cHdG-pjGHJYhhKumoD5Z308gSCQTUgOpclaESRUOV8NZyC9h0sI24Y1NHKhsKHOhC_IZm6bM_B93ry9MghjdqIa-qN-jVbzfd02qZt8X72Wt_skqhA86z0m8vyq_UdfdGx6hLsjJTzYox515i0rZRKsR2c0DLGja5re0hL92lghpgovOnZ6G80ex_IjXrGqEiO8xClBwCVbV8jIBOjDWdLXMqRFrWqxcpqOErgMN6IoFspxD61gKDon3VKBTQw',
        category: 'main_bowls',
      },
      {
        id: 'spicy-avocado-toast',
        name: 'Spicy Avocado Toast',
        description: 'Sourdough bread, mashed avocado, chili flakes, and radish sprouts.',
        price: 14.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7lrZEbonN_pDrGXWJwQ4W9BgkPHaY9G_PoEOMtn6GQZ44ndDv4yOYLuk3FB8qv_6u5dJn2-_XwwLNEuMe5yr9q-H6i7Fs6CvbqcrV8tYyq1v1PfbCUyyHZmSyIpkSaTe4VrmtEa1agr_fF4G2qTHLsKjzbZSQFqCRn_MyqHJ-C8M2-Ni1YOi1IHieh3DTVXiJglEwXYT_uELMugqVllwUqefHtM_L3idCEqSy6F8vAHJBK4onZsGL2OU-3kwSQXOQTXx-g8AiGRY',
        category: 'starters',
      },
      {
        id: 'zucchini-noodles',
        name: 'Zucchini Noodles',
        description: 'Fresh zoodles with roasted tomato pesto and toasted pine nuts.',
        price: 14.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEtUbEBxN-aufO4RQtoLNG0RTxgt5dpJMjrAsfutyztx6h22cowsU_3SsHqFs0RpaX0bhhqps1r4re7FhojGx0nyZXhzJDnSZLin2Ac_fmCScL3NNBYdXYKzWZZ6TR61yDfxDYlIQSuVYjaxTsoDQ_lFr_A_pVKweMyZvldxIzNFBspwIFbDbnDmcuPsR6bDQFCnyHB7lC55wEoyaWuc7GQTKu2oA9kZhhCGecR7oH0vxdOs4rlfvR1i7-4WkdX8cq1yXbvllfDxE',
        category: 'main_bowls',
      },
      {
        id: 'salmon-poke-bowl',
        name: 'Salmon Poke Bowl',
        description: 'Fresh salmon pieces, rich avocado, fresh edamame, and cucumber on high-grade sushi rice.',
        price: 18.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGfwkiy8BJZwh9MW9NDld0eNmznqnNzRwt_2mqnHAVj2N9izGOugxMUTx8ltSZ64EdotUGJo1zT2oyeLL1rCIMF2Vv7lfueDNTZa_EQ51YsN_pczKT9R1bzg6D_vpe7438zMrtQwV__Dq7G0WWwSlJSOUQQcUBs2YkpRdyWuiJa_dalTyN7Cy4tlMfmXJT5wC6MGksc0eYFpThTVz8T6P3ADKDA6TJv0BQF91F1wFWbg19RokN2UNI6YcljqUno5DAN1dKFxkh01E',
        category: 'main_bowls',
      },
      {
        id: 'matcha-iced-latte',
        name: 'Matcha Iced Latte',
        description: 'Authentic stone-ground Japanese matcha layered with creamy oat milk and ice.',
        price: 6.75,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB8_435nFdehLH_oBeKZ8p5YTUaz2jEBzEc9TCZY2-AvWIDGRpelf2RMk5UTLcQXO31-lCpVGf0Wm7HYbzqFxALqrs0_WahzTIVetVlD_7CYZ9rEcGbcf9q7Dj0w9UNpp_mvBtWY4tuc-gSJHSUHRfRPP7c4EnS5bHfPBEV1FEUpf0RwbUsDZY9L_Pd2R9jVwX2ALI24WmEKj5aJOk9aiCsTF5XnBzFRAbty3VR8Ogx_BVckKunDCOv33Yt1a3SotTXO4UocoUW1Y',
        category: 'refreshments',
      }
    ]
  },
  {
    id: 'sushiya-premium',
    name: 'Sushiya Premium',
    description: 'Exquisite, high-end traditional and custom sushi craft, made from directly imported fish.',
    rating: 4.9,
    time: '30-45 min',
    distance: '2.4 miles',
    cuisine: 'Sushi',
    categories: ['Japanese', 'Sushi', 'Fine Dining'],
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGtFNn9GuaciKgYYz1Vu-e8VR1lBAw5EYYhbyFmtmOTjxZEqHd9e-Nw0K37sHDaw9eykM5xA7YvCnfYTDXwxouMTTFvNOTFS0B7EI72vBmh6Bd3K7Zk37xzH9cCOBoy1zOqH3u6WcNg8GbnvE2s345ygXE2IwG1iRyMm2ea4CecmRV15VRz829rVdp5DsOuorXXNBf4eJtoROfe3wjmzdnrSQz59TndONmuu0dcPD_W0r5aStUUhITzzS_u6OqvALEWEkC3gKt65M',
    deliveryFee: '$2.99',
    menu: [
      {
        id: 'salmon-nigiri',
        name: 'Chef’s Salmon Nigiri Selection',
        description: 'Slices of fresh premium salmon on hand-pressed sushi rice with minor wasabi.',
        price: 24.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGtFNn9GuaciKgYYz1Vu-e8VR1lBAw5EYYhbyFmtmOTjxZEqHd9e-Nw0K37sHDaw9eykM5xA7YvCnfYTDXwxouMTTFvNOTFS0B7EI72vBmh6Bd3K7Zk37xzH9cCOBoy1zOqH3u6WcNg8GbnvE2s345ygXE2IwG1iRyMm2ea4CecmRV15VRz829rVdp5DsOuorXXNBf4eJtoROfe3wjmzdnrSQz59TndONmuu0dcPD_W0r5aStUUhITzzS_u6OqvALEWEkC3gKt65M',
        category: 'main_bowls'
      }
    ]
  },
  {
    id: 'burger-lab',
    name: 'The Burger Lab',
    description: 'Scientific precision added to smash patties, melted custom cheddar, and brioche bun craft.',
    rating: 4.7,
    time: '20-30 min',
    distance: '0.9 miles',
    cuisine: 'Burger',
    categories: ['Burgers', 'American', 'Craft'],
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmdhy2eKSu0BcqRRnsfafxA5tzVdsHNCyjbUy8E3KXhFYBuocCfbnpWSCvoixODoJa9_NOO56thcGWoyl788OYEX58qaY_5C_cpir6tBajYyFEpFdPQPZswBEbOL4jics9bwzoIgKejQSW0pPGqry6YK1yImKJdx83HqgbciwlLc1pPnKDacZlBC6-8VUcJcPCraVwmDPfyImUJkPHOh8pE3EfYfbauZwJgymDKYZkuqCk-NGQiR2foeRbXn8dLZ4LuqmLWXEiilw',
    deliveryFee: 'Free',
    menu: [
      {
        id: 'artisan-burger',
        name: 'The Lab Artisan Burger',
        description: 'Single signature aged brisket patty, triple melted cheddar, heirloom tomatoes, secret glaze.',
        price: 15.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmdhy2eKSu0BcqRRnsfafxA5tzVdsHNCyjbUy8E3KXhFYBuocCfbnpWSCvoixODoJa9_NOO56thcGWoyl788OYEX58qaY_5C_cpir6tBajYyFEpFdPQPZswBEbOL4jics9bwzoIgKejQSW0pPGqry6YK1yImKJdx83HqgbciwlLc1pPnKDacZlBC6-8VUcJcPCraVwmDPfyImUJkPHOh8pE3EfYfbauZwJgymDKYZkuqCk-NGQiR2foeRbXn8dLZ4LuqmLWXEiilw',
        category: 'main_bowls'
      }
    ]
  }
];

export const CUISINES = [
  { name: 'Healthy', icon: 'dual_screen' },
  { name: 'Sushi', icon: 'set_meal' },
  { name: 'Burger', icon: 'lunch_dining' },
  { name: 'Italian', icon: 'dinner_dining' },
  { name: 'Asian', icon: 'ramen_dining' },
  { name: 'Bakery', icon: 'bakery_dining' },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'CH-2938',
    restaurantName: 'The Green Kitchen',
    restaurantId: 'green-kitchen',
    items: [
      {
        id: 'salmon-poke-bowl',
        name: 'Salmon Poke Bowl',
        price: 18.50,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGfwkiy8BJZwh9MW9NDld0eNmznqnNzRwt_2mqnHAVj2N9izGOugxMUTx8ltSZ64EdotUGJo1zT2oyeLL1rCIMF2Vv7lfueDNTZa_EQ51YsN_pczKT9R1bzg6D_vpe7438zMrtQwV__Dq7G0WWwSlJSOUQQcUBs2YkpRdyWuiJa_dalTyN7Cy4tlMfmXJT5wC6MGksc0eYFpThTVz8T6P3ADKDA6TJv0BQF91F1wFWbg19RokN2UNI6YcljqUno5DAN1dKFxkh01E',
        specification: 'Extra Avocado, No Onions',
        restaurantId: 'green-kitchen'
      },
      {
        id: 'matcha-iced-latte',
        name: 'Matcha Iced Latte',
        price: 6.75,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB8_435nFdehLH_oBeKZ8p5YTUaz2jEBzEc9TCZY2-AvWIDGRpelf2RMk5UTLcQXO31-lCpVGf0Wm7HYbzqFxALqrs0_WahzTIVetVlD_7CYZ9rEcGbcf9q7Dj0w9UNpp_mvBtWY4tuc-gSJHSUHRfRPP7c4EnS5bHfPBEV1FEUpf0RwbUsDZY9L_Pd2R9jVwX2ALI24WmEKj5aJOk9aiCsTF5XnBzFRAbty3VR8Ogx_BVckKunDCOv33Yt1a3SotTXO4UocoUW1Y',
        specification: 'Oat Milk, Less Ice',
        restaurantId: 'green-kitchen'
      }
    ],
    subtotal: 25.25,
    deliveryFee: 2.00,
    serviceFee: 1.50,
    total: 28.75,
    status: 'on_the_way',
    date: 'Jun 12, 2026',
    estimatedTime: '12 mins',
    courierName: 'David',
    courierImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8CqZvwH_Oe9QAgKRsDDERGTi8EZA14aBvs1xYiIYv1p3OtKZc8fEmIKeAeGJ4JgUwX4p_TKbohsj2woH5L3uJ1w9jE0KflRCwykPFNTuwIl08E6nOADVYPbVgghu6hdCTmC6VpCzD6AnX4ga3EEsH1DIs6Oeu8xYraY0VpQyCrFBWyGXWMyupvcA1d5AJMwda_6gvSbR4NKm0uapjAj2WPDPVuMO_SJXTG1HRcSZSQu2N2G8XI1E8Mr0V8ou1brHG0n5PD2WsFes'
  }
];
