import os
import json
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error, root_mean_squared_error

def train_and_save_model(data_path="dataset/food_wastage_data.csv", output_dir="backend/ml"):
    os.makedirs(output_dir, exist_ok=True)
    print(f"Loading food wastage dataset from {data_path}...")
    df = pd.read_csv(data_path)

    # Normalize column names for consistent reference
    cat_cols = [
        'Type of Food', 'Event Type', 'Storage Conditions', 
        'Purchase History', 'Seasonality', 'Preparation Method', 
        'Geographical Location', 'Pricing'
    ]
    num_cols = ['Number of Guests', 'Quantity of Food']
    target_col = 'Wastage Food Amount'

    X = df[cat_cols + num_cols]
    y = df[target_col]

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), num_cols),
            ('cat', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'), cat_cols)
        ]
    )

    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=120, max_depth=16, random_state=42))
    ])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Training RandomForestRegressor on {len(X_train)} samples...")
    pipeline.fit(X_train, y_train)

    train_preds = pipeline.predict(X_train)
    test_preds = pipeline.predict(X_test)

    train_r2 = float(r2_score(y_train, train_preds))
    test_r2 = float(r2_score(y_test, test_preds))
    test_mae = float(mean_absolute_error(y_test, test_preds))
    test_rmse = float(root_mean_squared_error(y_test, test_preds))

    print(f"Train R2 Score: {train_r2:.4f}")
    print(f"Test R2 Score:  {test_r2:.4f}")
    print(f"Test MAE (kg):  {test_mae:.4f}")
    print(f"Test RMSE (kg): {test_rmse:.4f}")

    # Extract category option sets for frontend forms & validation
    categorical_options = {col: sorted(list(df[col].dropna().unique())) for col in cat_cols}

    meta = {
        "model_name": "Food Wastage Predictor (Random Forest Regressor)",
        "r2_score": round(test_r2, 4),
        "mae_kg": round(test_mae, 4),
        "rmse_kg": round(test_rmse, 4),
        "total_training_samples": len(df),
        "categorical_options": categorical_options,
        "feature_names": {
            "categorical": cat_cols,
            "numerical": num_cols
        }
    }

    model_path = os.path.join(output_dir, "wastage_model.joblib")
    meta_path = os.path.join(output_dir, "model_meta.json")

    joblib.dump(pipeline, model_path)
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2)

    print(f"Model successfully saved to {model_path}")
    print(f"Metadata saved to {meta_path}")

if __name__ == "__main__":
    train_and_save_model()

