import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Классический Бургер",
    description: "Сочная говяжья котлета, свежие овощи, сыр чеддер",
    price: 450,
    image: "/img/02166fcf-221c-4a03-95f7-3a56dd081d61.jpg",
    category: "Бургеры"
  },
  {
    id: 2,
    name: "Цезарь Салат",
    description: "Хрустящий салат, куриная грудка, пармезан, соус цезарь",
    price: 320,
    image: "/img/726459e5-6f3e-4acd-bf5b-8fcdcce4a3c4.jpg",
    category: "Салаты"
  },
  {
    id: 3,
    name: "Маргарита Пицца",
    description: "Томатный соус, моцарелла, свежий базилик",
    price: 520,
    image: "/img/f1f12554-15ac-4601-8d01-ef4e65e6014f.jpg",
    category: "Пицца"
  },
  {
    id: 4,
    name: "Чизбургер Делюкс",
    description: "Двойная котлета, два вида сыра, бекон, карамелизованный лук",
    price: 650,
    image: "/img/02166fcf-221c-4a03-95f7-3a56dd081d61.jpg",
    category: "Бургеры"
  },
  {
    id: 5,
    name: "Греческий Салат",
    description: "Помидоры, огурцы, оливки, фета, красный лук",
    price: 280,
    image: "/img/726459e5-6f3e-4acd-bf5b-8fcdcce4a3c4.jpg",
    category: "Салаты"
  },
  {
    id: 6,
    name: "Пепперони Пицца",
    description: "Острая пепперони, моцарелла, томатный соус",
    price: 580,
    image: "/img/f1f12554-15ac-4601-8d01-ef4e65e6014f.jpg",
    category: "Пицца"
  }
];

const categories = ["Все", "Бургеры", "Салаты", "Пицца"];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredItems = selectedCategory === "Все" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Icon name="UtensilsCrossed" className="h-8 w-8 text-orange-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">FoodDelivery</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Главная</a>
              <a href="#menu" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Меню</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Контакты</a>
              <a href="#profile" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Профиль</a>
            </nav>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
                  Корзина
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? "Корзина пуста" : `${getTotalItems()} товаров на сумму ${getTotalPrice()} ₽`}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto mt-6 space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.price} ₽</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {cart.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Итого: {getTotalPrice()} ₽</span>
                      </div>
                      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-orange-500 hover:bg-orange-600">
                            Оформить заказ
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Оформление заказа</DialogTitle>
                            <DialogDescription>
                              Заполните данные для доставки и оплаты
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">Имя</Label>
                              <Input id="name" placeholder="Ваше имя" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="phone" className="text-right">Телефон</Label>
                              <Input id="phone" placeholder="+7 (999) 123-45-67" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="address" className="text-right">Адрес</Label>
                              <Input id="address" placeholder="Адрес доставки" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="card" className="text-right">Карта</Label>
                              <Input id="card" placeholder="1234 5678 9012 3456" className="col-span-3" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button className="bg-orange-500 hover:bg-orange-600">
                              <Icon name="CreditCard" className="h-4 w-4 mr-2" />
                              Оплатить {getTotalPrice()} ₽
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Доставка еды за <span className="text-yellow-300">30 минут</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Свежие и вкусные блюда от лучших поваров прямо к вашему столу
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100 text-lg px-8 py-6">
                <Icon name="UtensilsCrossed" className="h-6 w-6 mr-3" />
                Смотреть меню
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-500 text-lg px-8 py-6">
                <Icon name="Truck" className="h-6 w-6 mr-3" />
                Узнать о доставке
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наше меню</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Выбирайте из широкого ассортимента блюд, приготовленных с любовью
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-gray-900">{item.name}</CardTitle>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {item.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-500">{item.price} ₽</span>
                    <Button
                      onClick={() => addToCart(item)}
                      className="bg-orange-500 hover:bg-orange-600 transition-colors"
                    >
                      <Icon name="Plus" className="h-4 w-4 mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают нас?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставляем за 30 минут по всему городу</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Качество продуктов</h3>
              <p className="text-gray-600">Только свежие и качественные ингредиенты</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Удобная оплата</h3>
              <p className="text-gray-600">Принимаем карты и электронные платежи</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Контакты</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Icon name="Phone" className="h-8 w-8 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Телефон</h3>
              <p className="text-gray-600">+7 (999) 123-45-67</p>
            </div>
            
            <div>
              <Icon name="Mail" className="h-8 w-8 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@fooddelivery.ru</p>
            </div>
            
            <div>
              <Icon name="MapPin" className="h-8 w-8 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Адрес</h3>
              <p className="text-gray-600">г. Москва, ул. Примерная, д. 1</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Icon name="UtensilsCrossed" className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-2xl font-bold">FoodDelivery</h3>
            </div>
            <p className="text-gray-400 mb-4">Лучшая доставка еды в городе</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Icon name="Instagram" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Icon name="Twitter" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Icon name="Facebook" className="h-6 w-6" />
              </a>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8">
              <p className="text-gray-400">© 2024 FoodDelivery. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}