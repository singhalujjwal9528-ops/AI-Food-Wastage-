import os
import sys
import sqlite3
import pandas as pd

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)
DATASET_DIR = os.path.join(PROJECT_ROOT, "dataset")

if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from database import DB_PATH, init_db, get_db

def seed_database():
    print(f"Connecting to SQLite database at {DB_PATH}...")
    init_db()

    with get_db() as conn:
        cursor = conn.cursor()

        # Check if already seeded
        cursor.execute("SELECT COUNT(*) FROM providers")
        count = cursor.fetchone()[0]
        if count > 0:
            print(f"Database already populated ({count} providers found). Re-seeding tables...")
            cursor.execute("DELETE FROM providers")
            cursor.execute("DELETE FROM receivers")
            cursor.execute("DELETE FROM claims")
            cursor.execute("DELETE FROM users")
            cursor.execute("DELETE FROM donations")
            cursor.execute("DELETE FROM pickups")
            cursor.execute("DELETE FROM notifications")

        # 1. Load providers_data.csv
        providers_csv = os.path.join(DATASET_DIR, "providers_data.csv")
        if not os.path.exists(providers_csv):
            providers_csv = "dataset/providers_data.csv"
        if os.path.exists(providers_csv):
            df_prov = pd.read_csv(providers_csv)
            prov_records = [
                (int(row['Provider_ID']), str(row['Name']), str(row.get('Type', '')), 
                 str(row.get('Address', '')), str(row.get('City', '')), str(row.get('Contact', '')))
                for _, row in df_prov.iterrows()
            ]
            cursor.executemany(
                "INSERT INTO providers (provider_id, name, type, address, city, contact) VALUES (?, ?, ?, ?, ?, ?)",
                prov_records
            )
            print(f"Seeded {len(prov_records)} providers from dataset.")

        # 2. Load receivers_data.csv
        receivers_csv = os.path.join(DATASET_DIR, "receivers_data.csv")
        if not os.path.exists(receivers_csv):
            receivers_csv = "dataset/receivers_data.csv"
        if os.path.exists(receivers_csv):
            df_rec = pd.read_csv(receivers_csv)
            rec_records = [
                (int(row['Receiver_ID']), str(row['Name']), str(row.get('Type', '')), 
                 str(row.get('City', '')), str(row.get('Contact', '')))
                for _, row in df_rec.iterrows()
            ]
            cursor.executemany(
                "INSERT INTO receivers (receiver_id, name, type, city, contact) VALUES (?, ?, ?, ?, ?)",
                rec_records
            )
            print(f"Seeded {len(rec_records)} receivers from dataset.")

        # 3. Load claims_data.csv
        claims_csv = os.path.join(DATASET_DIR, "claims_data.csv")
        if not os.path.exists(claims_csv):
            claims_csv = "dataset/claims_data.csv"
        if os.path.exists(claims_csv):
            df_claims = pd.read_csv(claims_csv)
            claim_records = [
                (int(row['Claim_ID']), int(row['Food_ID']), int(row['Receiver_ID']), 
                 str(row.get('Status', 'Pending')), str(row.get('Timestamp', '')))
                for _, row in df_claims.iterrows()
            ]
            cursor.executemany(
                "INSERT INTO claims (claim_id, food_id, receiver_id, status, timestamp) VALUES (?, ?, ?, ?, ?)",
                claim_records
            )
            print(f"Seeded {len(claim_records)} claims from dataset.")

        # 4. Seed Core Platform Users (for multi-role viva logins)
        core_users = [
            ('user-rest-1', 'Chef Rajesh Kumar', 'contact@annapurnabhavan.in', 'restaurant', '+91 98450 18274',
             'Annapurna Bhavan & Caterers', '42, 100 Feet Road, Indiranagar', 'Bengaluru, Karnataka', '', 1),
            ('user-ngo-1', 'Sister Sunita Rao', 'info@feedinghandsfoundation.org', 'ngo', '+91 94481 29384',
             'Feeding Hands Foundation', '15, 8th Main, Koramangala 4th Block', 'Bengaluru, Karnataka', '', 1),
            ('user-vol-1', 'Rahul Sharma', 'rahul.sharma@collegemail.edu.in', 'volunteer', '+91 98112 34567',
             'Youth Red Cross Volunteer Cell', 'Flat 302, Green Glen Layout, Bellandur', 'Bengaluru, Karnataka', '', 1),
            ('user-admin-1', 'Admin Coordinator (V. Murthy)', 'admin@aifoodwaste.org', 'admin', '+91 80 2558 9012',
             'AI Food Waste Platform Core Committee', 'Tech Innovation Hub, MG Road', 'Bengaluru, Karnataka', '', 1),
            ('user-rec-1', 'Kavitha Devi', 'kavitha.community@care.org', 'recipient', '+91 97312 90123',
             'Slum Welfare Support Group', 'Ejipura Community Shelter, Viveka Nagar', 'Bengaluru, Karnataka', '', 1),
        ]
        cursor.executemany(
            """INSERT INTO users (id, name, email, role, phone, organization, address, city, avatar, verified) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            core_users
        )
        print(f"Seeded {len(core_users)} core platform users.")

        # 5. Seed Core Viva Active Donations
        initial_donations = [
            ('DON-2026-101', 'Dal Makhani & Steamed Basmati Rice', 'Cooked Meals', 45.0, 'portions',
             'Today, 11:30 AM', 'Today, 03:30 PM', 3.5, 'user-rest-1', 'Annapurna Bhavan & Caterers',
             '42, 100 Feet Road, Indiranagar, Bengaluru', '+91 98450 18274',
             'Packed in food-grade thermal containers. Vegetarian. Clean spoons provided.', 'Veg',
             'Available', '2026-09-29 11:45', '', '', '', '', '', 3.2, 92.0, 1),

            ('DON-2026-102', 'Paneer Butter Masala with Tandoori Roti', 'Cooked Meals', 30.0, 'portions',
             'Today, 10:45 AM', 'Today, 02:45 PM', 2.2, 'user-rest-2', 'Spice Garden Grand Buffet',
             '88, 5th Block, Koramangala, Bengaluru', '+91 98860 39182',
             'Sealed hot buffet trays. High quality paneer. Stored at 65°C.', 'Veg',
             'Pickup Assigned', '2026-09-29 11:00', 'user-ngo-1', 'Feeding Hands Foundation',
             'user-vol-1', 'Rahul Sharma', '12:15 PM', 2.4, 86.0, 2),

            ('DON-2026-103', 'Assorted Artisan Breads & Croissants', 'Bakery & Bread', 25.0, 'packets',
             'Today, 07:00 AM', 'Tomorrow, 10:00 AM', 22.0, 'user-rest-3', 'Daily Bread Bakery & Cafe',
             '12, CMH Road, Indiranagar, Bengaluru', '+91 98455 12093',
             'Individually wrapped. Freshly baked morning batch. Ideal for shelter breakfast.', 'Veg',
             'Available', '2026-09-29 09:30', '', '', '', '', '', 1.8, 96.0, 3),

            ('DON-2026-104', 'Vegetable Dum Biryani with Mixed Raita', 'Cooked Meals', 55.0, 'portions',
             'Today, 11:00 AM', 'Today, 03:00 PM', 3.0, 'user-rest-4', 'Biryani Central Kitchen',
             '7th Sector, HSR Layout, Bengaluru', '+91 97401 55621',
             'Surplus from early wedding lunch. Sealed large aluminium degs.', 'Veg',
             'On the Way', '2026-09-29 11:20', 'user-ngo-2', 'Roti Bank Trust',
             'user-vol-1', 'Rahul Sharma', '12:45 PM', 4.1, 84.0, 4),

            ('DON-2026-105', 'Mixed Seasonal Vegetables (Carrots, Beans, Potatoes)', 'Fresh Produce', 35.0, 'kg',
             'N/A (Raw Fresh)', 'In 3 Days', 72.0, 'user-rest-5', 'Green Leaf South Indian Tiffin',
             '24th Cross, 4th Block, Jayanagar, Bengaluru', '+91 94490 88210',
             'Raw uncut vegetables from morning market surplus.', 'Veg',
             'Available', '2026-09-29 08:15', '', '', '', '', '', 6.8, 98.0, 5),

            ('DON-2026-106', 'Fresh Curd & Paneer Whey Packets', 'Dairy Products', 20.0, 'liters',
             'Today, 06:30 AM', 'Today, 06:00 PM', 6.0, 'user-rest-1', 'Annapurna Bhavan & Caterers',
             '42, 100 Feet Road, Indiranagar, Bengaluru', '+91 98450 18274',
             'Chilled in cold storage, need insulated transport.', 'Veg',
             'Delivered', '2026-09-29 07:00', 'user-ngo-1', 'Feeding Hands Foundation',
             'user-vol-2', 'Kiran Patel', '09:30 AM', 3.2, 100.0, 1),

            ('DON-2026-107', 'South Indian Meals & Sambar Rice', 'Cooked Meals', 60.0, 'portions',
             'Yesterday, 07:30 PM', 'Yesterday, 11:30 PM', 0.0, 'user-rest-5', 'Green Leaf South Indian Tiffin',
             '24th Cross, 4th Block, Jayanagar, Bengaluru', '+91 94490 88210',
             'Dinner surplus.', 'Veg',
             'Expired', '2026-09-28 19:40', '', '', '', '', '', 6.8, 0.0, 5)
        ]

        cursor.executemany(
            """INSERT INTO donations (
                id, food_name, category, quantity, unit, cooked_time, expiry_time,
                expires_in_hours, restaurant_id, restaurant_name, pickup_address,
                contact_number, additional_notes, dietary_type, status, created_at,
                assigned_ngo_id, assigned_ngo_name, assigned_volunteer_id,
                assigned_volunteer_name, estimated_delivery_time, distance_km,
                current_freshness_percent, raw_provider_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            initial_donations
        )
        print(f"Seeded {len(initial_donations)} core viva donations.")

        # 6. Import additional real listings from food_listings_data.csv
        listings_csv = "dataset/food_listings_data.csv"
        if os.path.exists(listings_csv) and os.path.exists(providers_csv):
            df_list = pd.read_csv(listings_csv)
            df_prov_lookup = pd.read_csv(providers_csv).set_index('Provider_ID')

            cat_mapping = {
                'Bread': 'Bakery & Bread',
                'Soup': 'Cooked Meals',
                'Fruits': 'Fresh Produce',
                'Rice': 'Cooked Meals',
                'Chicken': 'Cooked Meals',
                'Pasta': 'Cooked Meals',
                'Fish': 'Cooked Meals',
                'Vegetables': 'Fresh Produce',
                'Dairy': 'Dairy Products',
                'Salad': 'Fresh Produce'
            }

            additional_donations = []
            # Take 40 interesting records from dataset
            for idx, row in df_list.head(40).iterrows():
                fid = int(row['Food_ID'])
                don_id = f"DON-DS-{fid:04d}"
                food_name = str(row['Food_Name'])
                qty = float(row['Quantity'])
                prov_id = int(row['Provider_ID'])
                food_type = str(row['Food_Type'])
                diet = 'Veg' if ('Veg' in food_type or food_type == 'Vegan') else 'Non-Veg'
                category = cat_mapping.get(food_name, 'Cooked Meals')

                prov_name = f"Provider #{prov_id}"
                prov_address = str(row.get('Location', 'City Center'))
                prov_contact = "+91 98000 00000"

                if prov_id in df_prov_lookup.index:
                    prov_row = df_prov_lookup.loc[prov_id]
                    prov_name = str(prov_row['Name'])
                    prov_address = f"{prov_row.get('Address', '')}, {prov_row.get('City', '')}".strip(', ')
                    prov_contact = str(prov_row.get('Contact', '+91 98000 00000'))

                # Generate status & realistic freshness
                status = 'Available'
                assigned_ngo = ''
                assigned_vol = ''
                freshness = 90.0 - (fid % 30)

                additional_donations.append((
                    don_id, f"{food_name} Batch ({row.get('Meal_Type', 'Standard')})", category,
                    qty, 'kg' if category == 'Fresh Produce' else 'portions',
                    'Today, 10:00 AM', f"Valid till {row.get('Expiry_Date', 'Tomorrow')}",
                    4.5, f"prov-{prov_id}", prov_name, prov_address, prov_contact,
                    f"Surplus {food_name} from {row.get('Provider_Type', 'Kitchen')}. Certified quality.",
                    diet, status, '2026-09-29 10:00',
                    assigned_ngo, '', assigned_vol, '', '14:00 PM',
                    round(2.0 + (fid % 7) * 0.8, 1), freshness, prov_id
                ))

            cursor.executemany(
                """INSERT INTO donations (
                    id, food_name, category, quantity, unit, cooked_time, expiry_time,
                    expires_in_hours, restaurant_id, restaurant_name, pickup_address,
                    contact_number, additional_notes, dietary_type, status, created_at,
                    assigned_ngo_id, assigned_ngo_name, assigned_volunteer_id,
                    assigned_volunteer_name, estimated_delivery_time, distance_km,
                    current_freshness_percent, raw_provider_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                additional_donations
            )
            print(f"Seeded {len(additional_donations)} dataset-linked surplus food donations.")

        # 7. Seed Pickups
        initial_pickups = [
            ('PKP-801', 'DON-2026-102', 'Paneer Butter Masala with Tandoori Roti (30 portions)',
             '30 portions (~18 kg)', 'Spice Garden Grand Buffet', '88, 5th Block, Koramangala',
             'Feeding Hands Foundation', '15, 8th Main, Koramangala 4th Block',
             'user-vol-1', 'Rahul Sharma', 2.4, 12, '12:15 PM', 'Pickup Assigned',
             'High', 'Moderate', 86.0, '2026-09-29 11:05'),

            ('PKP-802', 'DON-2026-104', 'Vegetable Dum Biryani with Mixed Raita (55 portions)',
             '55 portions (~32 kg)', 'Biryani Central Kitchen', '7th Sector, HSR Layout',
             'Roti Bank Trust', '22, Richmond Town Community Hall',
             'user-vol-1', 'Rahul Sharma', 4.8, 22, '12:35 PM', 'On the Way',
             'High', 'Moderate', 84.0, '2026-09-29 11:25'),

            ('PKP-803', 'DON-2026-101', 'Dal Makhani & Steamed Basmati Rice (45 portions)',
             '45 portions (~25 kg)', 'Annapurna Bhavan & Caterers', '42, 100 Feet Road, Indiranagar',
             'Awaiting Claim', 'Nearest verified shelter',
             '', '', 3.2, 16, 'Within 2 hours', 'Available',
             'Medium', 'Light', 92.0, '2026-09-29 11:45'),

            ('PKP-804', 'DON-2026-103', 'Assorted Artisan Breads & Croissants (25 packets)',
             '25 packets (~10 kg)', 'Daily Bread Bakery & Cafe', '12, CMH Road, Indiranagar',
             'Awaiting Claim', 'Nearest shelter or orphanage',
             '', '', 1.8, 8, 'Within 6 hours', 'Available',
             'Normal', 'Light', 96.0, '2026-09-29 09:35'),

            ('PKP-805', 'DON-2026-106', 'Fresh Curd & Paneer Whey Packets (20 liters)',
             '20 liters (~20 kg)', 'Annapurna Bhavan & Caterers', '42, 100 Feet Road, Indiranagar',
             'Feeding Hands Foundation', '15, 8th Main, Koramangala 4th Block',
             'user-vol-2', 'Kiran Patel', 3.2, 15, '09:30 AM', 'Delivered',
             'Normal', 'Light', 100.0, '2026-09-29 07:15')
        ]

        cursor.executemany(
            """INSERT INTO pickups (
                id, donation_id, food_name, quantity, restaurant_name, restaurant_address,
                ngo_name, ngo_address, volunteer_id, volunteer_name, distance_km,
                estimated_time_min, pickup_time, status, urgency_level, traffic_condition,
                freshness_score, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            initial_pickups
        )
        print(f"Seeded {len(initial_pickups)} pickup tasks.")

        # 8. Seed Notifications
        initial_notifications = [
            ('notif-1', 'Urgent Pickup Required',
             'Dal Makhani (45 portions) from Annapurna Bhavan has 3.5 hrs freshness window.',
             'expiry', '10 mins ago', 0, '/ngo/dashboard'),
            ('notif-2', 'Volunteer Accepted Pickup',
             'Rahul Sharma has accepted pickup task #PKP-802 and is navigating to HSR Layout.',
             'pickup', '25 mins ago', 0, '/tracking'),
            ('notif-3', 'AI Route Optimisation Ready',
             'AI Engine calculated a 22-min multi-stop route saving 1.8 kg CO₂ emissions.',
             'ai_route', '1 hour ago', 1, '/ai-optimization'),
            ('notif-4', 'Food Handover Confirmed',
             'Donation #DON-2026-106 was delivered to Feeding Hands Foundation by Kiran Patel.',
             'delivery', '2 hours ago', 1, '/donation-history'),
            ('notif-5', 'New Restaurant Verified',
             'Green Leaf South Indian Tiffin received FSSAI safety accreditation.',
             'system', 'Yesterday', 1, '/admin/dashboard'),
        ]

        cursor.executemany(
            """INSERT INTO notifications (id, title, message, type, timestamp, read, action_url)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            initial_notifications
        )
        print(f"Seeded {len(initial_notifications)} notifications.")

        conn.commit()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()

