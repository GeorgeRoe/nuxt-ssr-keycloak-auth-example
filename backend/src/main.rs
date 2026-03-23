use axum::{
    http::{HeaderMap, StatusCode},
    routing::get,
    Json,
    Router,
};
use serde::Serialize;

#[derive(Serialize)]
struct UserResponse {
    bearer_token: String,
}

async fn get_user_details(headers: HeaderMap) -> Result<Json<UserResponse>, (StatusCode, String)> {
    let auth_header = headers
        .get("Authorization")
        .and_then(|h| h.to_str().ok())
        .ok_or((
            StatusCode::UNAUTHORIZED,
            "Missing or invalid Authorisation header".to_string(),
        ))?;

    // Here is where we would authenticate the bearer token with keycloak and fetch user details

    // This line is just to prove that the server receives an actual bearer token from nitro
    // In a real application we wouldnt do this because the whole point of using nuxt-auth-utils is that the client never knows the actual bearer token
    Ok(Json(UserResponse {
        bearer_token: auth_header.to_string(),
    }))
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/api/user", get(get_user_details));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3001")
        .await
        .unwrap();
        
    println!("Rust API running on http://127.0.0.1:3001");
    axum::serve(listener, app).await.unwrap();
}