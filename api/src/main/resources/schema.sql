-- User Management System Database Schema

-- Create users table (matching Java entity @Table(name = "users"))
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    CONSTRAINT chk_firstname_length CHECK (LENGTH(first_name) >= 3),
    CONSTRAINT chk_lastname_length CHECK (LENGTH(last_name) >= 3)
);


-- Insert sample data 
INSERT IGNORE INTO users (id, first_name, last_name, email) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'simo', 'dkali', 'simo.dkali@gmail.com'),
('550e8400-e29b-41d4-a716-446655440002', 'amine', 'alami', 'amine.alami@gmail.com'),
('550e8400-e29b-41d4-a716-446655440003', 'kamal', 'touzani', 'kamal.touzani@gmail.com');
