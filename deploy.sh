#!/bin/bash
# IPSC Timer - Quick Deploy to Vercel
# This script helps deploy the app to Vercel

set -e

echo "🚀 IPSC Timer - Vercel Deployment Setup"
echo "========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "Choose deployment option:"
echo "1) Deploy to preview (vercel)"
echo "2) Deploy to production (vercel --prod)"
echo "3) Just check build (npm run build)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🔨 Building and deploying to preview..."
        vercel
        ;;
    2)
        echo ""
        echo "⚠️  Deploying to PRODUCTION"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            vercel --prod
        else
            echo "❌ Production deployment cancelled"
        fi
        ;;
    3)
        echo ""
        echo "🔨 Testing build locally..."
        npm run build
        echo ""
        echo "✅ Build successful! Ready for deployment."
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Done!"
