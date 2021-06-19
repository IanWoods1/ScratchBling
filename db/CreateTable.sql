CREATE TABLE scratchers
    (item_name            text     NOT NULL,
     item_description     text,
     item_size            text[],
     item_cost            double precision,
    PRIMARY KEY (item_name));