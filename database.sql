-- UrbanMind AI Supabase Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Agents Table
-- Stores all autonomous agents in the system
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'optimal', -- 'optimal', 'warning', 'critical', 'offline'
    efficiency DECIMAL(5, 2) DEFAULT 100.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Incidents Table
-- Stores real-time anomalies and incidents across the city
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(100) NOT NULL, -- 'traffic', 'energy', 'water', 'security'
    severity VARCHAR(50) NOT NULL, -- 'low', 'medium', 'high', 'critical'
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'resolved', 'monitoring'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 3. Decisions Table
-- Stores autonomous decisions made by the agents
CREATE TABLE decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
    incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'executed', -- 'executed', 'requires_auth', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. KPIs Table
-- Stores system metrics over time
CREATE TABLE system_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(100) NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for prototype purposes, adjust in production)
CREATE POLICY "Allow public read access on agents" ON agents FOR SELECT USING (true);
CREATE POLICY "Allow public read access on incidents" ON incidents FOR SELECT USING (true);
CREATE POLICY "Allow public read access on decisions" ON decisions FOR SELECT USING (true);
CREATE POLICY "Allow public read access on system_metrics" ON system_metrics FOR SELECT USING (true);

-- Insert dummy data
INSERT INTO agents (name, type, status, efficiency) VALUES 
('TrafficGrid Core', 'Mobility', 'optimal', 98.2),
('PowerFlow AI', 'Energy', 'warning', 82.4),
('SecureNet Prime', 'Security', 'critical', 64.0);
