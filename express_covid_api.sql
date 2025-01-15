-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jan 2025 pada 09.57
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express_covid_api`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `status` enum('positive','recovered','dead') NOT NULL,
  `in_date_at` date NOT NULL,
  `out_date_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `patients`
--

INSERT INTO `patients` (`id`, `name`, `phone`, `address`, `status`, `in_date_at`, `out_date_at`) VALUES
(1, 'Budi', '081234567890', 'Jl. Mawar No. 10, Jakarta', 'recovered', '2025-01-01', '2025-01-05'),
(5, 'Ahmad Setiawan', '081234567890', 'Jl. Merdeka No. 25, Jakarta', 'positive', '2025-01-01', '2025-01-15'),
(6, 'Siti Aisyah', '082345678901', 'Jl. Raya No. 15, Bandung', 'recovered', '2025-01-03', '2025-01-10'),
(7, 'Budi Santoso', '083456789012', 'Jl. Pahlawan No. 7, Surabaya', 'positive', '2025-01-05', '2025-01-20'),
(8, 'Dewi Lestari', '084567890123', 'Jl. Kemerdekaan No. 11, Yogyakarta', 'dead', '2024-12-20', '2024-12-22'),
(9, 'Rudi Hartono', '085678901234', 'Jl. Suka Maju No. 4, Medan', 'recovered', '2024-11-10', '2024-11-15'),
(10, 'Indah Puspita', '086789012345', 'Jl. Raya Merdeka No. 2, Bali', 'positive', '2025-01-07', '2025-01-22'),
(11, 'Maya Kartika', '088901234567', 'Jl. Cendana No. 3, Malang', 'recovered', '2025-01-04', '2025-01-08'),
(13, 'Taufik Hidayat', '089012345678', 'Jl. Bambu No. 10, Makassar', 'dead', '2024-12-15', '2024-12-18');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
