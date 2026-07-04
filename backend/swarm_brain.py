import os
import time
import random
import logging
from dotenv import load_dotenv
from supabase import create_client, Client

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [SWARM_CORE] - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load Environment Variables from the Next.js .env.local file
env_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    logger.error("Supabase URL or Key is missing. Ensure .env.local is configured correctly.")
    exit(1)

# Initialize Supabase Client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Incident Generation Data
INCIDENT_TYPES = ['traffic', 'energy', 'water', 'security']
SEVERITY_LEVELS = ['low', 'medium', 'high', 'critical']
LOCATIONS = [
    {"lat": 40.7128, "lng": -74.0060}, # NYC
    {"lat": 34.0522, "lng": -118.2437}, # LA
    {"lat": 51.5074, "lng": -0.1278}, # London
    {"lat": 35.6762, "lng": 139.6503}, # Tokyo
]

def get_agents():
    """Fetch all agents from the database."""
    try:
        response = supabase.table('agents').select("*").execute()
        return response.data
    except Exception as e:
        logger.error(f"Failed to fetch agents: {e}")
        return []

def generate_anomaly():
    """Generate a random incident and insert it into Supabase."""
    logger.info("Analyzing city metrics... Anomaly detected.")
    
    incident_type = random.choice(INCIDENT_TYPES)
    severity = random.choice(SEVERITY_LEVELS)
    location = random.choice(LOCATIONS)
    
    # Slight coordinate fuzzing for realistic map spread
    lat = location["lat"] + random.uniform(-0.05, 0.05)
    lng = location["lng"] + random.uniform(-0.05, 0.05)
    
    incident_data = {
        "title": f"Autonomous Detection: {incident_type.capitalize()} Spike",
        "description": f"The Swarm Brain detected a {severity} severity anomaly in the {incident_type} sector. Immediate rerouting and load balancing is required.",
        "type": incident_type,
        "severity": severity,
        "latitude": lat,
        "longitude": lng,
        "status": "active"
    }
    
    try:
        res = supabase.table("incidents").insert(incident_data).execute()
        incident_id = res.data[0]['id']
        logger.info(f"Deployed Incident: {incident_data['title']} (ID: {incident_id})")
        return incident_id
    except Exception as e:
        logger.error(f"Failed to insert incident: {e}")
        return None

def update_agent_status(agent_id, status, efficiency):
    """Update the status and efficiency of a specific agent."""
    try:
        supabase.table("agents").update({
            "status": status,
            "efficiency": efficiency
        }).eq("id", agent_id).execute()
        logger.info(f"Updated Agent {agent_id} -> Status: {status}, Efficiency: {efficiency}%")
    except Exception as e:
        logger.error(f"Failed to update agent {agent_id}: {e}")

def resolve_old_incidents():
    """Randomly resolve older active incidents to simulate agent actions."""
    try:
        res = supabase.table("incidents").select("*").eq("status", "active").execute()
        incidents = res.data
        if not incidents:
            return

        # Resolve 20% of active incidents per cycle
        to_resolve = random.sample(incidents, k=max(1, int(len(incidents) * 0.2)))
        for inc in to_resolve:
            supabase.table("incidents").update({
                "status": "resolved"
            }).eq("id", inc['id']).execute()
            logger.info(f"Agent Action: Resolved Incident {inc['id']}")
    except Exception as e:
        logger.error(f"Failed to resolve incidents: {e}")

def main_loop():
    """Main autonomous loop for the Swarm Brain."""
    logger.info("Initializing UrbanMind Swarm Brain...")
    logger.info("Connecting to Supabase Realtime Network...")
    
    agents = get_agents()
    if not agents:
        logger.warning("No agents found in the database. Ensure dummy data is inserted.")
    
    cycle = 0
    while True:
        cycle += 1
        logger.info(f"--- Swarm Cycle {cycle} ---")
        
        # 1. Generate new anomalies periodically
        if random.random() < 0.4: # 40% chance per cycle to spawn an anomaly
            generate_anomaly()
            
        # 2. Simulate agent stress/recovery
        if agents:
            target_agent = random.choice(agents)
            new_efficiency = max(0.0, min(100.0, target_agent['efficiency'] + random.uniform(-10.0, 10.0)))
            
            # Determine status based on efficiency
            status = 'optimal'
            if new_efficiency < 50:
                status = 'critical'
            elif new_efficiency < 85:
                status = 'warning'
                
            update_agent_status(target_agent['id'], status, round(new_efficiency, 2))
            
            # update local agent reference
            target_agent['efficiency'] = new_efficiency
            target_agent['status'] = status
            
        # 3. Resolve old incidents
        resolve_old_incidents()
        
        # Wait before next tick (simulating continuous intelligence loop)
        sleep_time = random.uniform(5.0, 10.0)
        logger.info(f"Cycle complete. Entering deep learning sleep for {sleep_time:.1f}s...\n")
        time.sleep(sleep_time)

if __name__ == "__main__":
    try:
        main_loop()
    except KeyboardInterrupt:
        logger.info("Swarm Brain terminated by Operator.")
