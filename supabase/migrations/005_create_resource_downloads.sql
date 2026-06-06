-- Create resource_downloads table for tracking PDF downloads
CREATE TABLE IF NOT EXISTS resource_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  product_interest VARCHAR(255),
  resource_name VARCHAR(255) NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);

-- Create index for email lookups
CREATE INDEX idx_resource_downloads_email ON resource_downloads(email);

-- Create index for resource name
CREATE INDEX idx_resource_downloads_resource ON resource_downloads(resource_name);

-- Create index for downloaded_at
CREATE INDEX idx_resource_downloads_date ON resource_downloads(downloaded_at);

-- Add comment
COMMENT ON TABLE resource_downloads IS 'Tracks OEM resource PDF downloads for lead generation';
