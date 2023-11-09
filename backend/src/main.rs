use axum::{
    routing::get, Router,
};
use std::net::SocketAddr;
use axum_error::Result;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() -> Result<()> {
    let app = Router::new().route("/", get(index)).layer(CorsLayer::very_permissive());
    let address = SocketAddr::from(([0,0,0,0],8000));

    Ok(axum::Server::bind(&address)
    .serve(app.into_make_service())
    .await
    .unwrap())
}

async fn index()-> String{
    format!("hi!")
}
