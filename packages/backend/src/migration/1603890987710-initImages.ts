import { MigrationInterface, QueryRunner } from "typeorm";

export class initImages1603890987710 implements MigrationInterface {
    name = 'initImages1603890987710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "modos"."images" (
            id INTEGER GENERATED ALWAYS AS IDENTITY,
            urn TEXT NOT NULL,
            uri TEXT NOT NULL,
            url TEXT NOT NULL,
            azim "modos"."angle" NOT NULL,
            tilt "modos"."angle" NOT NULL,
            roll "modos"."angle" NOT NULL DEFAULT 0.0,
            exif_image_width_px "modos"."uint2" NOT NULL,
            exif_image_height_px "modos"."uint2" NOT NULL,
            exif_focal_length FLOAT NOT NULL,
            exif_focal_length_35mm FLOAT NOT NULL,
            exif_make TEXT NOT NULL,
            exif_model TEXT NOT NULL,
            exif_create_date TIMESTAMP WITH TIME ZONE NOT NULL,
            exif_modify_date TIMESTAMP WITH TIME ZONE,
            gps_version_id TEXT NOT NULL,
            gps_longitude_ref CHAR NOT NULL DEFAULT 'N',
            gps_longitude FLOAT NOT NULL,
            gps_latitude_ref CHAR NOT NULL DEFAULT 'E',
            gps_latitude FLOAT NOT NULL,
            gps_altitude_ref BOOLEAN NOT NULL DEFAULT 0::boolean,
            gps_altitude REAL NOT NULL,
            gps_datestamp DATE,
            gps_timestamp TIME WITH TIME ZONE,
            gps_satellites TEXT,
            gps_measure_mode CHAR NOT NULL DEFAULT 3,
            gps_dop REAL NOT NULL,
            gps_img_direction_ref CHAR NOT NULL,
            gps_img_direction "modos"."angle" NOT NULL,
            gps_map_datum TEXT NOT NULL DEFAULT 'WGS-84',
            gps_processing_method TEXT NOT NULL DEFAULT 'GPS',
            gps_differential BOOLEAN NOT NULL DEFAULT 0::boolean,
            gps_position_error TEXT NOT NULL DEFAULT 50,
            position geometry(Point, 4326) NOT NULL,
            data_source CHARACTER VARYING(256) NOT NULL DEFAULT 'mobapp',
            license CHARACTER VARYING(256) NOT NULL DEFAULT 'copyright',
            state CHARACTER VARYING(256) NOT NULL DEFAULT 'uploaded',
            availability CHARACTER VARYING(256) NOT NULL DEFAULT 'privately-available',
            "in_range" BOOLEAN NOT NULL DEFAULT FALSE,
            eid INT REFERENCES "modos"."edges" (id) NOT NULL,
            edist REAL NOT NULL,
            snap_geom geometry(Point, 4326) NOT NULL,
            user_id INT REFERENCES "modos"."user" (id),
            obs_id INT REFERENCES "modos"."observation" (id),
            event_id INT REFERENCES "modos"."event" (id),
            CONSTRAINT gps_processing_method_check CHECK (gps_processing_method='GPS' OR gps_processing_method='CELLID' OR gps_processing_method='WLAN' OR gps_processing_method='MANUAL' OR gps_processing_method='other'),
            CONSTRAINT data_source_check CHECK (data_source='mobapp' OR data_source='backpack' OR data_source='bike' OR data_source='scooter' OR data_source='private-owner' OR data_source='public-owner' OR data_source='other'),
            CONSTRAINT "license_check" CHECK (license='cc0' OR license='cc-by' OR license='cc-by-sa' OR license='cc-by-nc' OR license='cc-by-nc-sa' OR license='cc-by-nd' OR license='cc-by-nc-nd' OR license='copyright' OR license='other'),
            CONSTRAINT "state_check" CHECK (state='uploaded' OR state='participated-to-geo' OR state='participated-to-ml' OR  state='waiting-validation' OR state='validated' OR state='published' OR state='other'),
            CONSTRAINT availability_check CHECK (availability='publicly-available' OR availability='not-publicly-available' OR availability='privately-available' OR availability='pending-privacy-issue' OR availability='not-available' OR availability='other'),
            CONSTRAINT "images_pkey" PRIMARY KEY (id)
        );`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."observations_images" (
            id INTEGER GENERATED ALWAYS AS IDENTITY,
            observation_id INT REFERENCES "modos"."observation" (id),
            image_id INT REFERENCES "modos"."images" (id),
            CONSTRAINT observations_images_pkey PRIMARY KEY (id),
            CONSTRAINT "observations_images_unique" UNIQUE (observation_id, image_id)
        );`, undefined);

        await queryRunner.query(`CREATE TABLE "modos"."edges_images" (
            id INTEGER GENERATED ALWAYS AS IDENTITY,
            edge_id INT REFERENCES "modos"."edges" (id),
            image_id INT REFERENCES "modos"."images" (id),
            CONSTRAINT edges_images_pkey PRIMARY KEY (id),
            CONSTRAINT edges_images_unique UNIQUE (edge_id, image_id)
        );`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error("This migration cannot be reversed.");
    }

}
