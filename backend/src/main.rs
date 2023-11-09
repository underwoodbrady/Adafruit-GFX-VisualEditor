use axum::{
    routing::get, Router,
};
use std::net::SocketAddr;
use axum_error::Result;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() -> Result<()> {
    let app = Router::new()
    .route("/", get(index))
    .route("/upload", get(upload))
    .layer(CorsLayer::very_permissive());
    let address = SocketAddr::from(([0,0,0,0],2023));

    Ok(axum::Server::bind(&address)
    .serve(app.into_make_service())
    .await
    .unwrap())
}

async fn index()-> String{
    format!("testing!")
}

async fn upload() -> Result<String>{
    Ok(format!("Succesfully uploaded code!"))
}

fn upload_to_microcontroller(){
    //TODO: Use AVRDUDE (or ravedude) to upload code with call from the web (or avr-hal)
}
