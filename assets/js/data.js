const products = [
    {
        "ID": 1,
        "Marca": "Dell",
        "Tipo de Producto": "Laptop",
        "Modelo": "Inspiron 15",
        "Detalles": "15.6\" FHD, i5, 8GB RAM, 256GB SSD",
        "URL de Foto": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3520/media-gallery/notebook-inspiron-15-3520-black-gallery-6.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=655&qlt=100,1&resMode=sharp2&size=655,402&chrss=full",
        "Precio (ARS)": 150000,
        "Stock": 3
    },
    {
        "ID": 2,
        "Marca": "HP",
        "Tipo de Producto": "Laptop",
        "Modelo": "Pavilion 14",
        "Detalles": "14\" HD, Ryzen 5, 8GB RAM, 512GB SSD",
        "URL de Foto": "https://ar-media.hptiendaenlinea.com/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/9/1/91S43LA-2_T1717517864.png",
        "Precio (ARS)": 140000,
        "Stock": 5
    },
    {
        "ID": 3,
        "Marca": "Lenovo",
        "Tipo de Producto": "Laptop",
        "Modelo": "IdeaPad 3",
        "Detalles": "15.6\" FHD, i7, 16GB RAM, 512GB SSD",
        "URL de Foto": "https://p4-ofp.static.pub/fes/cms/2022/12/05/fokjguy2ergos4cz5ayyu76ugonz1n316370.png",
        "Precio (ARS)": 160000,
        "Stock": 8
    },
    {
        "ID": 4,
        "Marca": "Asus",
        "Tipo de Producto": "Laptop",
        "Modelo": "ZenBook 13",
        "Detalles": "13.3\" OLED, Ryzen 7, 16GB RAM, 1TB SSD",
        "URL de Foto": "https://imgs.search.brave.com/HiFz35jmm2jRa9fp8MwoEDzWAitn5Ba03oYAXXmYYPI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Z2VyLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9pbWcvYS9BVnZY/c0VoZTF6NTlhbHVF/amFoT0p1eUNLelVT/eGZsRktjMWhyOTM1/ZV9CS2p4Sk41cmZf/b3pLclRIX3RKXzhu/QldXQWx6Q09PZjhY/RTBwNnR2MkkwSHFh/bUZmaUYyUUdTNFpO/MkpSQVBvZURCRHpf/elpNa2lvNnVKdzhE/NV81d1lCaFVKZlpH/Y2ZEWUNSZUxMWEVh/MWYwODh0dUt2Ujhl/UTJWSDJUc2tsNWhk/Q0JISE1rMmVsVW8t/ek15X0U2ekJNdw",
        "Precio (ARS)": 180000,
        "Stock": 2
    },
    {
        "ID": 5,
        "Marca": "Acer",
        "Tipo de Producto": "Laptop",
        "Modelo": "Swift 3",
        "Detalles": "14\" FHD, i5, 8GB RAM, 256GB SSD",
        "URL de Foto": "https://imgs.search.brave.com/TJzI1-U5IhywaVSKppsz9USpx2TpGKYDCXYDLqP2Wc4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnVsbGg0cmQuY29t/LmFyL2ltZy9wcm9k/dWN0b3MvMzIvbm90/ZWJvb2stMTQtYWNl/ci1zd2lmdC0zLWNp/My1pMy1nYi1zc2Qy/NTYtd2luMTAtMC5q/cGc",
        "Precio (ARS)": 145000,
        "Stock": 6
    },
    {
        "ID": 6,
        "Marca": "MSI",
        "Tipo de Producto": "Laptop",
        "Modelo": "GF63 Thin",
        "Detalles": "15.6\" FHD, i7, 16GB RAM, 512GB SSD",
        "URL de Foto": "https://imgs.search.brave.com/BiCoeYlt8qYnBe2_cNgPU5VTlH0tcVVyaZIOCNxPo-o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFSQ0xwNFdQcEwu/anBn",
        "Precio (ARS)": 170000,
        "Stock": 4
    },
    {
        "ID": 7,
        "Marca": "HP",
        "Tipo de Producto": "Monitor",
        "Modelo": "Pavilion 27",
        "Detalles": "27\" QHD, IPS, 75Hz",
        "URL de Foto": "https://imgs.search.brave.com/0a0xsmW2ZQc15B11SoZbUOSKQOodyo05ScwfGEFdVWA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFxbVIwcU1pVEwu/anBn",
        "Precio (ARS)": 70000,
        "Stock": 10
    },
    {
        "ID": 8,
        "Marca": "Samsung",
        "Tipo de Producto": "Monitor",
        "Modelo": "Odyssey G5",
        "Detalles": "27\" QHD, 144Hz, Curved",
        "URL de Foto": "https://imgs.search.brave.com/muiqYE-8klJBi0N3qSbK_OgzQLlQcjLjbyIDT6LBDX0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF83/MTI3OTAtTUxVNzI4/MjU0Nzk5NjFfMTEy/MDIzLUYud2VicA",
        "Precio (ARS)": 80000,
        "Stock": 3
    },
    {
        "ID": 9,
        "Marca": "LG",
        "Tipo de Producto": "Monitor",
        "Modelo": "UltraGear 27GL850",
        "Detalles": "27\" QHD, 144Hz, Nano IPS",
        "URL de Foto": "https://imgs.search.brave.com/KYdqdpGMQip9dEs-MP4hy7dXHuDBh1EnZVtFefBe24k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nemhs/cy5hdC9pLzc1LzI5/LzIwNzc1MjktbjAu/anBn",
        "Precio (ARS)": 75000,
        "Stock": 12
    },
    {
        "ID": 10,
        "Marca": "Asus",
        "Tipo de Producto": "Monitor",
        "Modelo": "VG248QE",
        "Detalles": "24\" FHD, 144Hz, 1ms",
        "URL de Foto": "https://imgs.search.brave.com/ZT22WJ1vk9o29RMSNCexUxC90ovrlOpe8FuxMWuQ3oQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFZVld0TnJ5Wkwu/anBn",
        "Precio (ARS)": 50000,
        "Stock": 7
    },
    {
        "ID": 11,
        "Marca": "BenQ",
        "Tipo de Producto": "Monitor",
        "Modelo": "Zowie XL2411P",
        "Detalles": "24\" FHD, 144Hz, 1ms",
        "URL de Foto": "https://imgs.search.brave.com/dZ-NoUUsPcg1nLBGK2aZnMKa5DUROSVJq4QXjWp1iHA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnVsbGg0cmQuY29t/LmFyL2ltZy9wcm9k/dWN0b3MvMTgvbW9u/aXRvci0yNC0tLWJl/bnEtZ3cyNDgwLTht/cy0wLmpwZw",
        "Precio (ARS)": 55000,
        "Stock": 5
    },
    {
        "ID": 12,
        "Marca": "ViewSonic",
        "Tipo de Producto": "Monitor",
        "Modelo": "VX3276-2K-MHD",
        "Detalles": "32\" QHD, IPS, 75Hz",
        "URL de Foto": "https://imgs.search.brave.com/-_TeMBcW4nsJTp8hzJunjebaXNyPioDZHTTvSgwLpYU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFEWlVwZGkxSkwu/anBn",
        "Precio (ARS)": 65000,
        "Stock": 9
    },
    {
        "ID": 13,
        "Marca": "Corsair",
        "Tipo de Producto": "Teclado Mecánico",
        "Modelo": "K95 RGB Platinum",
        "Detalles": "Cherry MX Speed, RGB Lighting",
        "URL de Foto": "https://imgs.search.brave.com/Ro74YGful0Fa948xG9te_24KUDvvxF8aNp2klbZcEPM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFuaVFpS0w5bEwu/anBn",
        "Precio (ARS)": 25000,
        "Stock": 15
    },
    {
        "ID": 14,
        "Marca": "Razer",
        "Tipo de Producto": "Teclado Mecánico",
        "Modelo": "BlackWidow Elite",
        "Detalles": "Green Switch, RGB Lighting",
        "URL de Foto": "https://imgs.search.brave.com/z_qMBODjTl-oMb_vBJrHFlnm7aKYIt_LCkxAv-36GWM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFseFFnSjhCNkwu/anBn",
        "Precio (ARS)": 23000,
        "Stock": 8
    },
    {
        "ID": 15,
        "Marca": "Logitech",
        "Tipo de Producto": "Teclado Mecánico",
        "Modelo": "G Pro X",
        "Detalles": "Customizable Switches, RGB Lighting",
        "URL de Foto": "https://imgs.search.brave.com/TpVHdCqVrNUry_feDcDL9QSRSqLW7HZEyqY1aHRl5p8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFmdkpYZlBzOUwu/anBn",
        "Precio (ARS)": 22000,
        "Stock": 7
    },
    {
        "ID": 16,
        "Marca": "HyperX",
        "Tipo de Producto": "Teclado Mecánico",
        "Modelo": "Alloy FPS Pro",
        "Detalles": "Red Switch, Compact Design",
        "URL de Foto": "https://imgs.search.brave.com/U4yCyY7q_JQXWBrVH3H7gUHBtw4MrhhWdOdg2x_fq4U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/ODI2NzItTUxBMzE5/ODA0NTc3ODJfMDgy/MDE5LU8ud2VicA",
        "Precio (ARS)": 20000,
        "Stock": 6
    },
    {
        "ID": 17,
        "Marca": "SteelSeries",
        "Tipo de Producto": "Teclado Mecánico",
        "Modelo": "Apex Pro",
        "Detalles": "Adjustable Mechanical Switches, RGB",
        "URL de Foto": "https://imgs.search.brave.com/EWzVN0DGqF9XfMNt2aC0TZ_knwyo-uxSbN1Xf2NMuJs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxYURaR0RPd2xM/LmpwZw",
        "Precio (ARS)": 27000,
        "Stock": 4
    },
    {
        "ID": 18,
        "Marca": "Asus",
        "Tipo de Producto": "Teclado Mecánico",
        "Modelo": "ROG Strix Scope",
        "Detalles": "Cherry MX Red, RGB Lighting",
        "URL de Foto": "https://imgs.search.brave.com/_yRa6rMLZMqcFAO2G5UMw7P8yh_IhYnSsLaqCynZo1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFqUG92bk5yLUwu/anBn",
        "Precio (ARS)": 24000,
        "Stock": 10
    },
    {
        "ID": 19,
        "Marca": "Logitech",
        "Tipo de Producto": "Mouse",
        "Modelo": "G502 HERO",
        "Detalles": "25K DPI, RGB Lighting",
        "URL de Foto": "https://imgs.search.brave.com/MsZCBs9-2S2osNDvguuAI9dljNGABJbmQ2qbK92WFfo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mdWxs/aDRyZC5jb20uYXIv/aW1nL3Byb2R1Y3Rv/cy8xNC9tb3VzZS1s/b2dpdGVjaC1nNTAy/LWdhbWluZy1oZXJv/LTkxMDAwNTU1MC0w/LmpwZw",
        "Precio (ARS)": 9500,
        "Stock": 3
    },
    {
        "ID": 20,
        "Marca": "Razer",
        "Tipo de Producto": "Mouse",
        "Modelo": "DeathAdder Elite",
        "Detalles": "16K DPI, RGB Lighting",
        "URL de Foto": "https://imgs.search.brave.com/8NhkS51LbD6VkpGqCMKcPyRdExvrW0SEgVOmnmlAfQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFua3NVWnVSWEwu/anBn",
        "Precio (ARS)": 9500,
        "Stock": 4
    },
    {
        "ID": 21,
        "Marca": "Corsair",
        "Tipo de Producto": "Mouse",
        "Modelo": "M65 RGB Elite",
        "Detalles": "18K DPI, RGB Lighting",
        "URL de Foto": "https://imgs.search.brave.com/0a2Bco80PbPnjgahAcinbyxOstY9sd9uEia-7mUdCQk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxamJld2EwSVBM/LmpwZw",
        "Precio (ARS)": 11000,
        "Stock": 5
    },
    {
        "ID": 22,
        "Marca": "SteelSeries",
        "Tipo de Producto": "Mouse",
        "Modelo": "Rival 600",
        "Detalles": "12K DPI, Dual Sensor System",
        "URL de Foto": "https://imgs.search.brave.com/xX-6c84cO_paoiDZgVYZYsfgLuOeRpD5YhlFh4AqrwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MjEzMG9kLUpBUEwu/anBn",
        "Precio (ARS)": 12500,
        "Stock": 6
    },
    {
        "ID": 23,
        "Marca": "HyperX",
        "Tipo de Producto": "Mouse",
        "Modelo": "Pulsefire FPS Pro",
        "Detalles": "16K DPI, RGB Lighting",
        "URL de Foto": "https://imgs.search.brave.com/BNktR-94IkGSkPUu9_K6mdD2KrnlhiHWmkH3LrHnqmo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yb3cu/aHlwZXJ4LmNvbS9j/ZG4vc2hvcC9wcm9k/dWN0cy9oeXBlcnhf/cHVsc2VmaXJlX2Zw/c19wcm9fM19hbmds/ZWRfZnJvbnRfMjA0/OHgyMDQ4LmpwZz92/PTE2NjI0NDk2NTg",
        "Precio (ARS)": 8500,
        "Stock": 7
    },
    {
        "ID": 24,
        "Marca": "Asus",
        "Tipo de Producto": "Mouse",
        "Modelo": "ROG Gladius II",
        "Detalles": "12K DPI, RGB Lighting",
        "URL de Foto": "https://imgs.search.brave.com/cvUG2HiAPrpmUvMta8vOsHgbO2LpDqZwprCTkA5LnMM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjEzV1A1Yk5RcUwu/anBn",
        "Precio (ARS)": 10500,
        "Stock": 8
    },
    {
        "ID": 25,
        "Marca": "Kingston",
        "Tipo de Producto": "Memoria RAM",
        "Modelo": "HyperX Fury 16GB",
        "Detalles": "16GB DDR4, 3200MHz",
        "URL de Foto": "https://imgs.search.brave.com/FMqZsx2BC2KV0je8Z8CZI33Z6sYxGfTibYS-pUMfnoQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdG9y/YWdlLmdvb2dsZWFw/aXMuY29tL3BpY2th/Ym9vLXByb2QvbWVk/aWEvY2F0YWxvZy9w/cm9kdWN0L2NhY2hl/LzkwZTNiOWY0MTIw/ZmMyMDliZjYwMDAz/ZTNiMGUxMzIzL2gv/eS9oeXBlcngtZnVy/eS01LjIuMjQuXzEu/anBn",
        "Precio (ARS)": 15000,
        "Stock": 10
    },
    {
        "ID": 26,
        "Marca": "Corsair",
        "Tipo de Producto": "Memoria RAM",
        "Modelo": "Vengeance LPX 16GB",
        "Detalles": "16GB DDR4, 3200MHz",
        "URL de Foto": "https://imgs.search.brave.com/RisoLlV5B0rGq27beuU7aRLM7G5vXG0gENj-gPL9Y_I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzE3RCtGd3JtSEwu/anBn",
        "Precio (ARS)": 15500,
        "Stock": 12
    },
    {
        "ID": 27,
        "Marca": "G.Skill",
        "Tipo de Producto": "Memoria RAM",
        "Modelo": "Trident Z RGB 16GB",
        "Detalles": "16GB DDR4, 3200MHz",
        "URL de Foto": "https://imgs.search.brave.com/k5IgZCXSxsS3lPX_G-EXFLqNxfs3Rh_m4ZNkm-wzdZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcnI2/MjJ3dWN0bjI2LmNs/b3VkZnJvbnQubmV0/L2ltYWdlL2NhY2hl/L2NhdGFsb2cvbWVt/b3J5L2clMjBza2ls/bC9mNC0zMjAwYzE2/ZC0xNmd0enIvZy1z/a2lsbC10cmlkZW50/LXotcmdiLWRkcjRm/NC0zMjAwYzE2ZC0x/Nmd0enItNjQ2Ni02/MDB4NjAwLmpwZw",
        "Precio (ARS)": 16500,
        "Stock": 8
    },
    {
        "ID": 28,
        "Marca": "Crucial",
        "Tipo de Producto": "Memoria RAM",
        "Modelo": "Ballistix 16GB",
        "Detalles": "16GB DDR4, 3200MHz",
        "URL de Foto": "https://imgs.search.brave.com/LVgFtBuWcQIDVffc0KKN6XaTgQCmS-9OLfonxIz-C-8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzF2UTZEZ1BQMEwu/anBn",
        "Precio (ARS)": 16000,
        "Stock": 9
    },
    {
        "ID": 29,
        "Marca": "Adata",
        "Tipo de Producto": "Memoria RAM",
        "Modelo": "XPG Spectrix D60G 16GB",
        "Detalles": "16GB DDR4, 3200MHz",
        "URL de Foto": "https://imgs.search.brave.com/P63wFsC8VyleZibbdDXybD2ZYkCStWcaK7i26vRJniE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxczZXZzdCY3FM/LmpwZw",
        "Precio (ARS)": 17000,
        "Stock": 5
    },
    {
        "ID": 30,
        "Marca": "Samsung",
        "Tipo de Producto": "Memoria RAM",
        "Modelo": "16GB DDR4",
        "Detalles": "16GB DDR4, 3200MHz",
        "URL de Foto": "https://imgs.search.brave.com/pD5QcDsTu82gETgNv6aPDxn2z2yUdLykFkJmGuESSBE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFDM2QyNU9uekwu/anBn",
        "Precio (ARS)": 14500,
        "Stock": 7
    }
]
