import sqlite3
import os
from typing import Generator
from contextlib import contextmanager

DB_PATH = os.path.join(os.path.dirname(__file__), "food_waste.db")

def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

@contextmanager
def get_db():
    conn = get_db_connection()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    with get_db() as conn:
        cursor = conn.cursor()

        # Providers from dataset
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS providers (
            provider_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT,
            address TEXT,
            city TEXT,
            contact TEXT
        )
        """)

        # Receivers from dataset
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS receivers (
            receiver_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT,
            city TEXT,
            contact TEXT
        )
        """)

        # Claims from dataset
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS claims (
            claim_id INTEGER PRIMARY KEY,
            food_id INTEGER,
            receiver_id INTEGER,
            status TEXT,
            timestamp TEXT
        )
        """)

        # Platform Users
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE,
            role TEXT NOT NULL,
            phone TEXT,
            organization TEXT,
            address TEXT,
            city TEXT,
            avatar TEXT,
            verified INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)

        # Donations (Active & Historical food surplus listings)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS donations (
            id TEXT PRIMARY KEY,
            food_name TEXT NOT NULL,
            category TEXT NOT NULL,
            quantity REAL NOT NULL,
            unit TEXT NOT NULL,
            cooked_time TEXT,
            expiry_time TEXT,
            expires_in_hours REAL,
            restaurant_id TEXT,
            restaurant_name TEXT,
            pickup_address TEXT,
            contact_number TEXT,
            additional_notes TEXT,
            dietary_type TEXT,
            status TEXT NOT NULL,
            created_at TEXT,
            assigned_ngo_id TEXT,
            assigned_ngo_name TEXT,
            assigned_volunteer_id TEXT,
            assigned_volunteer_name TEXT,
            estimated_delivery_time TEXT,
            distance_km REAL,
            current_freshness_percent REAL,
            raw_provider_id INTEGER
        )
        """)

        # Pickup Tasks
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS pickups (
            id TEXT PRIMARY KEY,
            donation_id TEXT NOT NULL,
            food_name TEXT NOT NULL,
            quantity TEXT NOT NULL,
            restaurant_name TEXT NOT NULL,
            restaurant_address TEXT,
            ngo_name TEXT,
            ngo_address TEXT,
            volunteer_id TEXT,
            volunteer_name TEXT,
            distance_km REAL,
            estimated_time_min INTEGER,
            pickup_time TEXT,
            status TEXT NOT NULL,
            urgency_level TEXT,
            traffic_condition TEXT,
            freshness_score REAL,
            created_at TEXT
        )
        """)

        # Notifications
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS notifications (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            type TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            read INTEGER DEFAULT 0,
            action_url TEXT
        )
        """)

        # AI ML Wastage Predictions Archive
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS wastage_predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            food_type TEXT NOT NULL,
            num_guests INTEGER NOT NULL,
            event_type TEXT NOT NULL,
            quantity REAL NOT NULL,
            storage TEXT NOT NULL,
            purchase_history TEXT,
            seasonality TEXT,
            preparation_method TEXT,
            location TEXT,
            pricing TEXT,
            predicted_wastage REAL NOT NULL,
            co2_impact REAL NOT NULL,
            risk_level TEXT NOT NULL,
            recommendations TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)

        conn.commit()
        print("Database schema successfully verified/initialized.")

