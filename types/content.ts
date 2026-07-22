export type ProfilCard = {
    icon: string;
    title: string;
    desc: string;
};

export type PotensiItem = {
    icon: string;
    title: string;
    items: string[];
    image: string;
};

export type FasilitasItem = {
    icon: string;
    title: string;
    desc: string;
};

export type LembagaItem = {
    name: string;
    desc: string;
    logo: string;
    badge: string;
};

export type GaleriItem = {
    alt: string;
    src: string;
    span: boolean;
};

export type SiteContent = {
    nav: {
        ctaLabel: string;
    };
    hero: {
        title: string;
        subtitle: string;
        ctaLabel: string;
        backgroundImage: string;
    };
    sambutan: {
        badge: string;
        heading: string;
        quote: string;
        body: string;
        name: string;
        role: string;
        photo: string;
    };
    profilCards: ProfilCard[];
    sejarah: {
        heading: string;
        paragraphs: string[];
        image: string;
    };
    visiMisi: {
        visi: string;
        misi: string[];
    };
    potensi: PotensiItem[];
    fasilitas: FasilitasItem[];
    lembaga: LembagaItem[];
    galeri: GaleriItem[];
    footer: {
        address: string;
        phone: string;
        email: string;
        copyright: string;
    };
};

// Dipakai sebagai seed/fallback konten selama belum ada backend.
export const defaultContent: SiteContent = {
    nav: {
        ctaLabel: "Hubungi Kami",
    },
    hero: {
        title: "Selamat Datang di Website Resmi Desa Bone",
        subtitle:
            "Melayani masyarakat dengan integritas, transparansi, dan komitmen untuk kemajuan berkelanjutan bagi seluruh warga Desa Bone.",
        ctaLabel: "Profil Desa",
        backgroundImage:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDnRohpHBjzey40d86rdylkyFmt1ZFtMRNzAQ5a6DVL3pQF7Owxa3Gww_Y_cMj0iNxdhOSmi2STW5mWb-5DZml7Xzg0-5PqB3PRQ7n_FpWlS828_PM4qrOh0PTHimDC7GlErYtU7N9hQDWi99GJQj9T41xM96WkRFKeWkH5Vhcz_fwIupRoL87S_p-01GTy-xGnloQ1KkNvqBsjl2oSVFqT-5vOh8vLAy57w7b3bofh6lgnNA0X-Grbew",
    },
    sambutan: {
        badge: "Sambutan Hangat",
        heading: "Kepala Desa Bone",
        quote:
            "Assalamualaikum Warahmatullahi Wabarakatuh, Salam Sejahtera untuk kita semua.",
        body: "Selamat datang di portal informasi digital Desa Bone. Website ini merupakan wujud komitmen kami dalam mewujudkan tata kelola pemerintahan desa yang transparan dan akuntabel. Kami mengundang seluruh elemen masyarakat dan pengunjung untuk menjelajahi potensi, sejarah, serta program pembangunan yang sedang kami laksanakan. Semoga platform ini bermanfaat bagi kemajuan kita bersama.",
        name: "Drs. H. M. Yusuf Ibrahim",
        role: "Kepala Desa Bone",
        photo:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA0bassw3c6YKdGcDPad0Gl-wuWAnK6cWsmSffrJZMRHE7oKykN_3E1u9MNmXcEgKe-6FUUAz4Yz2X1geVigaRDqF9KxCh0Jzvcjn5j6WcktGeIC8fanXSi2mqdPS37J3wKg-GH_eQsy2cxcKSRALepN13LqPCrFSqi6lLeE_Bj4qogXQ5u3t52SJpXT4LN4AASh4yWT21LE7zVxQKvWRl6uj6a7HnfVyw28qFCLelAgtujmgjCE5U0Qg",
    },
    profilCards: [
        {
            icon: "history_edu",
            title: "Sejarah Desa",
            desc: "Menelusuri jejak leluhur dan asal-usul terbentuknya komunitas Desa Bone.",
        },
        {
            icon: "target",
            title: "Visi Misi",
            desc: "Arah kebijakan dan target pembangunan desa untuk 5 tahun ke depan.",
        },
        {
            icon: "account_tree",
            title: "Struktur",
            desc: "Bagan organisasi pemerintahan desa yang bertugas melayani warga.",
        },
        {
            icon: "groups",
            title: "Perangkat",
            desc: "Profil para pelayan publik yang berdedikasi tinggi di Desa Bone.",
        },
    ],
    sejarah: {
        heading: "Sejarah Desa Bone",
        paragraphs: [
            'Desa Bone memiliki akar sejarah yang kuat, bermula dari pemukiman agraris kecil di pesisir lembah hijau. Nama "Bone" sendiri dalam bahasa lokal merujuk pada kekayaan alam dan keteguhan masyarakatnya dalam menjaga harmoni dengan alam.',
            "Seiring berjalannya waktu, Desa Bone berkembang menjadi pusat perdagangan hasil bumi yang vital bagi wilayah sekitarnya. Transformasi dari pemukiman tradisional menuju desa modern yang berbasis teknologi tidak melunturkan nilai-nilai gotong royong yang telah diwariskan turun-temurun.",
            "Hari ini, Desa Bone berdiri sebagai simbol kemajuan desa mandiri yang tetap menjunjung tinggi kearifan lokal dan keberlanjutan lingkungan.",
        ],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA-ART8iTYu-1qVOqrgBNMxnpdbCGFRotCXpxLhsvhXS6JlwRBcUTp9134-oZDVMz5V90XxVWh6nWxBuzr1UvXnPo8JfAE6Q0umJ3oyd1rQVtI7412Pkev0p1AwVfD6ABPkgiNf7hWNYs9Heqh0TOk1kf-CTyL4cjy0Mgq8hbx-OR2g0v7ZxQgi11ErQ8iXdCWGmN2lzLLVBWyfEoCxSzjKCbAGD2uOOqB7FxJK30nnTdRO5BSnHuUTwg",
    },
    visiMisi: {
        visi: "Terwujudnya Desa Bone yang Mandiri, Sejahtera, dan Inovatif melalui Pengelolaan Sumber Daya Alam yang Berkelanjutan dan Pelayanan Publik yang Prima Berbasis Teknologi.",
        misi: [
            "Meningkatkan kualitas SDM melalui program pendidikan dan kesehatan desa.",
            "Optimalisasi potensi pertanian dan peternakan sebagai pilar ekonomi warga.",
            "Membangun infrastruktur desa yang merata dan berkelanjutan.",
            "Mewujudkan tata kelola pemerintahan yang transparan dan digital.",
        ],
    },
    potensi: [
        {
            icon: "agriculture",
            title: "Sektor Pertanian",
            items: [
                "Padi Organik Varietas Unggul",
                "Perkebunan Sayuran Dataran Rendah",
                "Produksi Buah Tropis (Mangga & Jeruk)",
            ],
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAd5sToa00HLXnq6ZqB5Bl9i876UxGEUGde-OPS6haFU48xNg-Z7-gLXWnfIOh4R1HL0RL9tUaLzTSnCFxlTtk_RXfMSqDLA6IBBpAwZag6C5EsQ9TsOOgFkDPkXY1kHprlZEIb8jZ5o3rmslphDQZnImdxoPa-eMFUoGs_ORyhuQ5qakUNbESEN6YIRSzjzhykvd0Q2EdLMC7NDOsCJxmCQmj-pGL0VxQsayFNTBhfSyATBx-BnVmOAA",
        },
        {
            icon: "pets",
            title: "Sektor Peternakan",
            items: [
                "Budidaya Sapi Potong Modern",
                "Peternakan Ayam Petelur Komunal",
                "Produksi Pakan Ternak Mandiri",
            ],
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBLVO5jq7IoOVk2qvxyQ6Cqb4D_Y5_BDzuqIAgUjH4v5ozssnJnwk8yVWyT2h8g4q87pvmQoiR8CMA4uR5iKxGXDHdG00Zh4xCC57ytAajIS_gtadreYwLZPBO38XSyHvob1Et8kgV0DQ92WJt_nitZtSZ8O3Ux0b8PfZCpNcFL5Npczp6yYHmae2ha9OTtBN3_3QxfdliCLr5LK1V70CQE4TB8CdO4URBy93xzimQm6DtUTcuMcN9X1g",
        },
    ],
    fasilitas: [
        { icon: "school", title: "Sekolah", desc: "Pendidikan Berkualitas" },
        {
            icon: "medical_services",
            title: "Puskesmas",
            desc: "Layanan Kesehatan 24/7",
        },
        {
            icon: "location_city",
            title: "Balai Desa",
            desc: "Pusat Administrasi",
        },
        { icon: "mosque", title: "Ibadah", desc: "Sarana Ibadah Nyaman" },
    ],
    lembaga: [
        {
            name: "TP. PKK Desa Bone",
            desc: "Pemberdayaan Kesejahteraan Keluarga untuk mewujudkan keluarga yang mandiri, berakhlak mulia, dan sehat sejahtera.",
            logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs9R0EPe2qVtD7b5VPtW1m2lDea2Ry-iiI1Aif1jPADithgALMpD8XpLIsFpEbxvHKNeBfqAdvNjPSjCgb66168h0D3ceAQ1ZO8aXEGicR6wTFQD5HV4GQdwBGjm-AZmK7SmvpADRdHMISpFMy7qkbYeXsAQ3srk2cmLRnKX-uQgj2SLItDasCvQQUTqpB5HAH9q8LgBN8fw_xcexZ-pVGaZtTcuANaJlEFmiLv_F6LQXfe8CClO0Gfw",
            badge:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCkWsyKmKnvvUkHMHZIyAdvNTxFFHca0_eVSfvqIOBQRmpWiIDZSy683LttxVPng293z9xTBiJkptQdmaJBuWwTGPQ1TIvduL_fvPJ0S9_7k34Ird7Ir-q76Wli2tNfd1xu52s0icjkRFcPzwV6HNc_YLM-n1yaQRdUdxd2KLli4UenaLNiAOw2fJ2YaZNKj9-6fmKDGWBZwOu5q1NcrKEKLmwA8IpJtRS-3SumYmOQPmKu2GJobKU-uQ",
        },
        {
            name: "Karang Taruna",
            desc: "Wadah pengembangan generasi muda yang kreatif, aktif, dan berkontribusi nyata dalam pembangunan sosial masyarakat.",
            logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSeyMtDXzAcMiiwTuS3Em46JeRj6lZhDzSK0HUI6qHcPwt2eUoxZJ_ND2jZe1ub6gCmejQGcZ-q0YEP_plZoC94yEonRco4AVNekdksgpsDa-eaB_VCDLjSBTmZsGawPqrSB61o-nVrJQdtTm-iXv4xRycwe3Japd8CtBLabXS51Hr-3iJt0hpAJ9Mpw9RSXolMn3zAbTL-wzyOJRep2EwnofKQFSe8TirgR8icTmWB5i_XM9AVu2kiQ",
            badge:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDXwFcagl1HB8gTUhXCg6_pivYXZtKcCS0QAxGIZjH3SgILEAq97IeqOk1rMJo_dMrnxpdoitEr182AuTgQKpKa_NZCfjBJ9QO7_7HAcSvV3C_oaO05VFM9kigmEj86CKkibp4eX3u582-m0x7Tocx8g2hL7vnVoQEzlNK-ZVDdI9ZR-c2toq0mPeSMkzTEB3h5cIBMxQ5yptAfGxZXsxW1mXkq6U2OtBaaZ6scETlyFkja0rV2EgPFPw",
        },
        {
            name: "Kelompok Tani",
            desc: "Sinergi para petani dalam meningkatkan produktivitas hasil bumi melalui inovasi teknologi dan kolaborasi mandiri.",
            logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgbonX6YpwuH4leALmpX5yOwG6TGw8KWb2tN5poBwUt7dbQkcQd_RXXBRlyFFifbV-hwUynaBtS_FtVhyltHUWm9eaMFQiaA6P4eZ9UrZ9TnvUWbitJFzJJfSNfR_SkubYxPQJ0waVLIHwgBCaM6qTkwAvokMx7_BC2I3seKTA5MS4mTbXUjgwxK0dDWoF6dJG-it28aOKkcqagyLL5ziNMJrHxwi5lVW24c_xWtvDyXF7RCbiy_ZHEw",
            badge:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCBP7tokT4UQpSZopZ7f1Yu2n44HCq3aBGEHpEKWH1KH7EI4VOuFDOJ5tYTlTrxlLlAI60NpCqUslR3exMfjSkh2qd61vH1KmuudOunAUabp9NGR-4CJevdt7F2MPrUAIsdixum8N34j9KH_HuGbB-vXSsxewqucxZZjrt9eZgIF20t43lThhD4WpF7qv8zESlNBq3ug_tuVrNaJVaSxulmE7FImAs5M1UMUosMjqvlJED0aihChVItcA",
        },
    ],
    galeri: [
        {
            alt: "Gotong royong warga desa",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuALmOT7ffU1DwSVjhKVS5meViIFIHoWpBPa7IYwwVBj5BuDXRZWzUsGWZT-MMEuehRm44W5WlAo4RyBGgjewKHnIXrQpejh3usyreR5pytBvdpCeS8G0HfuiMyq1C-JSv7xhGOrzJsDqh_7V8J80gf_fhrc1mJRU7G_s0UGA8iAmMii0ma2L2uk6_70caogRia_VXv14SvRly4xeRzD_i4uyFcSZ5WCcUPzz0d-KrSSm8ZiXOaWf1S06A",
            span: false,
        },
        {
            alt: "Festival budaya tradisional desa",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3HJpPaYTI3MBa4tYZpRrvi6y4nnQ7xS4m_O2BUw9dx0XjHQgAeRyKjnxgf3D-vcoe6KV06PObmzHtsuOiosmMvoKXftvIQeVHSA4_nByvg9UlLe-jLLrS0btudTwAt5QWGJGSix1FshN0YM6sdmMcpl0bFGT340ZC6_-a_jM1mYeGQZxHcniIaihA7vmcn06_QxL8UThrMyNZ8KQ5u0rcFbiH0N-boER01AxR1_jiPF1-fFR7u6_Hmw",
            span: false,
        },
        {
            alt: "Pelatihan pertanian modern dengan drone",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqR-YpUZ1KIRvW2lnmGVnVLIHZ1lvfXrIBsccCS_cp-qaYR3m5T8O5IUWLXVss9x51UhqY2NkNe7IgzgfnhvsA0Ex4KEZI8wgKXr_rzNw1gOHlwpVWOLZ2vuKUBCjWWFvIuT0I5YVaqVDXtyVnjSqz1t-hzBd_yX-YiwewvyQNJ-D_jkFXSyPjbfr-pN7b3uqU2lEiTRnScuSJTmqmdhXFXamClo2WWv03i3gt7pIevRzpB-RsLoNyHA",
            span: false,
        },
        {
            alt: "Kegiatan belajar anak-anak di sekolah desa",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAzTO9AFsPB3X4TmHmmXP-VbFs2heBx7HHiYWv9qjiIFFcbu0vH3qE_H5czx4d2HTQb7OAXTJoP3GcBMD8N31OzicU6PgYvmhmcZ9Ht2PKuwxtxnHAyr2yQPvyY7U5KxDPrmxHQIXt7tRFUxkrof-RC_T46eIykt4hI7rIjA-NcUSrPhWCo1YZWWTZ2TP59Z5_3MVjKTqRKl5oeA1sCDsVquYfW6gRPlw2Y7nq0Wid5qvEKD0hKDtbfQ",
            span: true,
        },
        {
            alt: "Kerajinan tenun tradisional",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH5Y1oRqj27grlJz80JQ2rhmQWamVw8dqfTfJ2LIIa-URTyeKvGSoNEiuUItPcadxmSBvYjtYEJ8i0ZwmElVfN_OiI1SZxfht_feBpoIhfJU8Hmg9l1Uq0ta7zRSTJ5tKiqmZMWGCdohr1VCFVPPnLfgef77NvDdLv0jzjn-r4OUjg_ca4O-seewWIN9qPIa5lopY0r4BLcYPWlHQlkiEoE0-8XE12AhpA_Nov1eZHQRpXEAwXjHzUcw",
            span: false,
        },
        {
            alt: "Pembangunan infrastruktur jalan desa",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJkFSm9wAArI2J5BrziqCmphZ2HiZW82Tj4cWNO-VRgKyWOlAk3bfuf6Vxl-3Ycb7Clh0vo49Wog05sZQwWlsYvzHE0H-b48ej0UQH7aLB72mqhOHTY6v0FBUhkyQ6Wb1eW8yzMPRehl_o-cCjRKutt2_aQbChsvpV-_4OxBPPStIHyYJF0p_3z1_GCyfNv98i5ClY6z1aIdqRbou5MjuPfl3jlJJhftvfTe3wf2M7YupuVQMfTKu6LA",
            span: false,
        },
    ],
    footer: {
        address:
            "Jl. Raya Poros Bone No. 01, Kec. Bone, Kab. Bone, Sulawesi Selatan, 92711",
        phone: "(0481) 123-4567",
        email: "kontak@desabone.go.id",
        copyright: "© 2024 Pemerintah Desa Bone. Seluruh Hak Cipta Dilindungi.",
    },
};