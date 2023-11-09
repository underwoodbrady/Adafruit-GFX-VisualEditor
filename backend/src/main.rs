use axum::{
    routing::get, Router,
};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(index));
    let address = SocketAddr::from(([0,0,0,0],8000));
    axum::Server::bind(&address)
    .serve(app.into_make_service())
    .await
    .unwrap();
}

async fn index()-> String{
    format!("Hello, world!")
}
