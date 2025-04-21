<meta charset="UTF-8" />
<style>
	@print {
		size: A4; /* Set page size */
		margin: 10cm; /* Set margins */

		#bill {
			width: 58mm; /* Set the paper width */
			font-size: 12px;
			height: 400px;
		}

		.receipt {
			width: 100%;
			position: relative;
		}
	}

	p {
		margin: 0;
	}

	.table_detail {
		border-collapse: collapse;
	}

	.table_detail tbody tr:first-child {
		border-top: 2px solid #000 !important;
	}
</style>
<div
	id="bill"
	class="receipt"
	style="
		margin: 0;
		font-family: Helvetica;
		font-size: 12px;
		page-break-after: always;
	">
	<div>
		<div style="margin: 10px 0 12px 0">
			<p style="margin-bottom: 1em">
				<strong style="font-size: 18px">{{ store.name }}</strong>
			</p>
			<p><strong>Địa chỉ:</strong> {{ store.address }}</p>
			<p><strong>Điện thoại:</strong> {{ store.phone }}</p>
			<p><strong>Website:</strong> {{ store.website }}</p>
			<p><strong>Ngày bán:</strong> {{ date_created }}</p>
		</div>
		<div style="clear: both"></div>
	</div>
	<div style="width: 100%; text-align: center">
		<h3
			style="
				font-size: 14px;
				line-height: 12px;
				text-transform: uppercase;
				text-align: center;
				margin: 0;
			">
			Hóa đơn: {{ code }}
		</h3>
		<img
			style="margin: auto; height: 68px; z-index: 1; position: relative"
			class="print_barcode order"
			val="#9999"
			height="68px"
			src="{{ barcode_img }}" />
		<div
			style="
				width: 100%;
				height: 28px;
				background: #ffffff;
				margin-top: -28px;
				z-index: 10;
				position: relative;
			"></div>
	</div>
	<div style="width: 100%">
		<div style="margin: 0 0 12px 0; white-space: normal">
			<p><strong>KH:</strong> {{ shipping_fullname }}</p>

			{% if shipping_full_address %}
			<p><strong>Địa chỉ:</strong> {{ shipping_full_address }}</p>
			{% endif %}

			<p><strong>SĐT:</strong> {{ shipping_phone }}</p>

			{% if billing_email %}
			<p><strong>Email:</strong> {{ billing_email }}</p>
			{% endif %}
		</div>

		<table
			style="
				margin: 0 0 12px 0;
				font-size: 12px;
				width: 100%;
				border-top: 2px solid #000;
				border-bottom: 1px dashed #333;
			"
			class="table_detail">
			<thead>
				<tr>
					<th style="width: 60%; text-align: left; padding: 5px 0px">
						Đgiá/Ggiảm
					</th>
					<th style="width: 10%; text-align: center; padding: 5px 0px">SL</th>
					<th style="width: 30%; text-align: right; padding: 5px">T.Tiền</th>
				</tr>
			</thead>
			<tbody>
				{% for product in details.data %}
				<tr valign="top" style="border-top: 1px solid #d9d9d9">
					<td colspan="3" style="padding: 5px 0px 0">
						<p style="margin-bottom: 5px">
							{{ product.item_name }}
							{% if product.product_json.option_name %} -
							<span style="margin: 0">{{
								product.product_json.option_name
							}}</span>
							{% endif %} - <span>{{ product.product_json.sku }}</span>
						</p>
					</td>
				</tr>
				<tr valign="top">
					<td style="padding: 5px 0px; text-align: left">
						{{ product.item_unit_price | currency }}
					</td>
					<td style="padding: 5px 0px; text-align: center">
						{{ product.item_quantity }}
					</td>
					<td style="padding: 5px 0px; text-align: right">
						{{ product.price_sell | currency }}
					</td>
				</tr>
				{% endfor %}
			</tbody>
		</table>
		<table
			style="
				font-size: 12px;
				width: 100%;
				margin: 0 0 12px 0;
				text-align: right;
				float: right;
			">
			<tbody>
				<tr>
					<td colspan="2" style="width: 50%; padding: 5px 0px">
						Phí vận chuyển: {{ price_shipping | currency }}
					</td>
				</tr>
				{% if price_tax %}
				<tr>
					<td colspan="2" style="width: 50%; padding: 5px 0px">
						Phí VAT : {{ price_tax_value | currency }}
					</td>
				</tr>
				{% endif %} {% for promotion in promotions %} {% if promotion.discount
				%}
				<tr>
					<td colspan="2" style="padding: 5px 0px">
						Khuyến mãi "{{ promotion.code }}":
						{{ promotion.discount | currency }}
					</td>
				</tr>
				{% endif %} {% endfor %}

				<tr>
					<td colspan="2" style="padding: 5px 0px">
						<strong>Thành tiền: {{ price_final | currency }}</strong>
					</td>
				</tr>
				<tr>
					<td colspan="2" style="width: 50%">
						Tiền phải thanh toán: <strong>{{ debt | currency }}</strong>
					</td>
				</tr>
				<tr>
					<td colspan="2" style="width: 50%; padding: 5px 0px">
						Tiền đã thanh toán: <strong>{{ deposit | currency }}</strong>
					</td>
				</tr>
			</tbody>
		</table>
		{% if note %}
		<table style="font-size: 12px; width: 100%; margin: 0 0 12px 0">
			<tr>
				<td><strong>Ghi chú</strong>: {{ note }}</td>
			</tr>
		</table>
		{% endif %}
	</div>
	<div style="clear: both"></div>
	<p>
		Nếu bạn có thắc mắc, vui lòng liên hệ chúng tôi qua email
		{{ store.email }} hoặc {{ store.phone }}
	</p>
</div>
