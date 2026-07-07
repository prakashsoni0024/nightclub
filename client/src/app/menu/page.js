"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Martini,
  Beef,
  Pizza,
  Soup,
  Salad,
  Drumstick,
  IceCream,
  Wine,
  Beer,
  GlassWater,
  Coffee,
} from "lucide-react";

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("foods");

  const menu = useMemo(
    () => ({
      foods: [
        {
          category: "Starters",
          icon: <UtensilsCrossed size={20} />,
          items: [
            { name: "Chicken Tikka", price: 349 },
            { name: "Paneer Tikka", price: 299 },
            { name: "Crispy Corn", price: 249 },
            { name: "French Fries", price: 199 },
            { name: "Chilli Paneer", price: 319 },
            { name: "Chicken Lollipop", price: 389 },
          ],
        },

        {
          category: "Pizza",
          icon: <Pizza size={20} />,
          items: [
            { name: "Margherita Pizza", price: 349 },
            { name: "Farmhouse Pizza", price: 429 },
            { name: "Chicken Supreme Pizza", price: 499 },
            { name: "Cheese Burst Pizza", price: 479 },
          ],
        },

        {
          category: "Main Course",
          icon: <Beef size={20} />,
          items: [
            { name: "Butter Chicken", price: 449 },
            { name: "Chicken Handi", price: 479 },
            { name: "Paneer Butter Masala", price: 369 },
            { name: "Dal Makhani", price: 299 },
            { name: "Veg Kolhapuri", price: 329 },
            { name: "Jeera Rice", price: 199 },
          ],
        },

        {
          category: "Chinese",
          icon: <Soup size={20} />,
          items: [
            { name: "Veg Hakka Noodles", price: 269 },
            { name: "Chicken Hakka Noodles", price: 339 },
            { name: "Schezwan Fried Rice", price: 289 },
            { name: "Chicken Fried Rice", price: 349 },
            { name: "Chilli Chicken", price: 389 },
          ],
        },

        {
          category: "Salads",
          icon: <Salad size={20} />,
          items: [
            { name: "Green Salad", price: 169 },
            { name: "Caesar Salad", price: 279 },
            { name: "Greek Salad", price: 299 },
          ],
        },

        {
          category: "Desserts",
          icon: <IceCream size={20} />,
          items: [
            { name: "Brownie with Ice Cream", price: 269 },
            { name: "Chocolate Lava Cake", price: 249 },
            { name: "Vanilla Ice Cream", price: 149 },
          ],
        },
      ],

      drinks: [
        {
          category: "Cocktails",
          icon: <Martini size={20} />,
          items: [
            { name: "Mojito", price: 349 },
            { name: "Long Island Iced Tea", price: 499 },
            { name: "Cosmopolitan", price: 449 },
            { name: "Whiskey Sour", price: 429 },
            { name: "Sex on the Beach", price: 469 },
            { name: "Margarita", price: 449 },
          ],
        },

        {
          category: "Mocktails",
          icon: <GlassWater size={20} />,
          items: [
            { name: "Virgin Mojito", price: 229 },
            { name: "Blue Lagoon", price: 249 },
            { name: "Fruit Punch", price: 239 },
            { name: "Green Apple Cooler", price: 249 },
          ],
        },

        {
          category: "Beer",
          icon: <Beer size={20} />,
          items: [
            { name: "Kingfisher Premium", price: 249 },
            { name: "Budweiser", price: 299 },
            { name: "Corona", price: 399 },
            { name: "Heineken", price: 329 },
          ],
        },

        {
          category: "Whisky",
          icon: <Wine size={20} />,
          items: [
            { name: "Black Dog", price: 349 },
            { name: "Blenders Pride", price: 299 },
            { name: "Chivas Regal", price: 599 },
            { name: "Johnnie Walker Black", price: 699 },
          ],
        },

        {
          category: "Hot Beverages",
          icon: <Coffee size={20} />,
          items: [
            { name: "Espresso", price: 149 },
            { name: "Cappuccino", price: 179 },
            { name: "Cafe Latte", price: 189 },
            { name: "Hot Chocolate", price: 219 },
          ],
        },
      ],
    }),
    [],
  );
  return (
    <section className="relative overflow-hidden bg-black min-h-screen">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-pink-500/10 blur-[150px]" />

      <div className="absolute top-1/2 -right-32 w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[180px]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="container-width relative z-10 px-6 py-36">
        {/* Hero */}

        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              uppercase
              tracking-[0.30em]
              text-pink-400
              text-xs
              mb-4
            "
          >
            Crafted Food • Signature Drinks
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
              font-cinzel
              font-black
              text-5xl
sm:text-6xl
md:text-6xl
lg:text-7xl
             
              leading-[0.95]
              tracking-[0.08em]
            "
          >
            <span className="text-white/95">Our </span>

            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Menu
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="
              mt-5
              max-w-xl
              mx-auto
              text-gray-400
              text-sm
              sm:text-base
              leading-7
            "
          >
            Discover a menu designed for unforgettable evenings, premium
            experiences, and the vibrant nightlife of D'Casa The Pub.
          </motion.p>
        </div>
        {/* Menu Navigation */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            sticky
            top-24
            z-40
            mb-20
            flex
            justify-center
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              backdrop-blur-2xl
              p-1
              shadow-[0_0_40px_rgba(236,72,153,0.08)]
            "
          >
            <button
              onClick={() => setActiveTab("foods")}
              className={`
                flex
                items-center
                gap-2
                rounded-full
                px-6
                py-2.5
                text-xs
font-semibold
tracking-[0.18em]
                uppercase
              
                transition-all
                duration-300

                ${
                  activeTab === "foods"
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-pink-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <UtensilsCrossed size={15} />
              Foods
            </button>

            <button
              onClick={() => setActiveTab("drinks")}
              className={`
                flex
                items-center
                gap-2
                rounded-full
                px-6
                py-2.5
                text-xs
font-semibold
tracking-[0.18em]
                uppercase
              
                transition-all
                duration-300

                ${
                  activeTab === "drinks"
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-pink-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Martini size={15} />
              Drinks
            </button>
          </div>
        </motion.div>

        {/* Active Menu */}

        <div className="space-y-20">
          {(activeTab === "foods" ? menu.foods : menu.drinks).map(
            (category, categoryIndex) => (
              <motion.section
                key={category.category}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: categoryIndex * 0.08,
                }}
                className="
    mb-12
  "
              >
                {/* Category Header */}

                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-gradient-to-br
                        from-pink-500/20
                        via-purple-500/20
                        to-cyan-500/20
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                        text-pink-400
                      "
                    >
                      {category.icon}
                    </div>

                    <div>
                      <h2
                        className="
                          font-cinzel
                          text-2xl md:text-3xl
                          font-bold
                          tracking-[0.08em]
                          text-white/90
                        "
                      >
                        {category.category}
                      </h2>

                      <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gray-500">
                        {category.items.length} Items
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block h-px flex-1 ml-10 bg-gradient-to-r from-pink-500/40 via-purple-500/30 to-transparent" />
                </div>

                {/* Menu Items */}

                <div className="grid md:grid-cols-2 gap-5">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: itemIndex * 0.05,
                      }}
                      className="
                        group
                        rounded-2xl
                        border
                        border-white/8
                        bg-white/[0.03]
                        backdrop-blur-xl
                        px-5 py-4
                        transition-all
                        duration-300
                        hover:border-pink-500/40
                        hover:bg-white/[0.05]
                        hover:-translate-y-1
                      "
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            w-2
                            h-2
                            rounded-full
                            bg-gradient-to-r
                            from-pink-500
                            to-cyan-400
                            shrink-0
                          "
                        />

                        <h3
                          className="
                            flex-1
                            text-white/85
                            font-medium
                            tracking-wide
                            group-hover:text-pink-300
                            transition-colors
                          "
                        >
                          {item.name}
                        </h3>

                        <div className="flex-1 border-b border-dashed border-white/10" />

                        <span
                          className="
                            text-lg
                            font-semibold
                            text-pink-400
                            whitespace-nowrap
                          "
                        >
                          ₹{item.price}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ),
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
    mx-auto
    mb-8
    max-w-6xl
    rounded-xl
    border
    border-amber-500/20
    bg-amber-500/10
    backdrop-blur-xl
    px-4
    py-3
  "
      >
        <p className="text-center text-sm leading-5 text-amber-100/90">
          <span className="font-semibold uppercase tracking-wider text-amber-300">
            Notice:
          </span>{" "}
          Menu items and prices displayed here are for reference only. Actual
          availability and pricing may vary as our menu is updated regularly.
          Please confirm the latest menu and prices with our staff during your
          visit.
        </p>
      </motion.div>
    </section>
  );
}
